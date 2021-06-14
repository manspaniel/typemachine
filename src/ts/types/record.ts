import { Schema, Static, createType } from "../base";
import { String } from "./string";
// import { Stack, Flex } from "../../controls/spec"

type AnyObject = { [key: string]: any };

export type TRecordProperties<T extends AnyObject> = {
  [key in keyof T]: Schema<any, T[key]>;
};
export interface TRecord<T> extends Schema<"record", T> {
  static: T;
  type: "record";
  properties: T;
  required: string[];
  layout: {
    direction?: "horizontal" | "vertical";
    compact?: boolean;
  };
}

export type Options = {
  direction?: "horizontal" | "vertical";
  compact?: boolean;
};

/** Creates a json schema object. Statically resolves to an object of the given property types. */
export const Record = createType(
  <T extends AnyObject>(
    properties: TRecordProperties<T>,
    opts: Options = {}
  ): TRecord<T> => {
    const required = Object.keys(properties).filter((key) => {
      const type = properties[key];
      if (!type) return false;
      return !type.optional && type.type !== "conditional";
    });
    const props: any = {};
    for (const key in properties) {
      if (!properties[key]) continue;
      props[key] = {
        type: properties[key],
        schema: properties[key].getJSONSchema(),
      };
    }
    return {
      type: "record",
      properties: props,
      required,
      layout: {
        direction: opts.direction,
        compact: opts.compact,
      },
      // getUI: (scope): Stack | Flex => {
      //   const items = []
      //   for (const key in properties) {
      //     const item = properties[key]
      //     if (!item) continue
      //     const prop = item.getUI(scope + '/' + key)
      //     prop.title = prop.title || key
      //     items.push(prop)
      //   }
      //   return {
      //     type: opts.direction === 'horizontal' ? 'flex' : 'stack',
      //     items: items
      //   }
      // },
      getJSONSchema: () => {
        const props: any = {};
        let allOf = [];
        for (const key in properties) {
          const prop = properties[key] as any;
          if (!prop) continue;
          if (prop.type === "conditional") {
            // const schema = prop.getJSONSchema()
            const thenSchema = prop.then.getJSONSchema();
            const elseSchema = prop.else ? prop.else.getJSONSchema() : false;
            allOf.push({
              if: prop.if.getJSONSchema(),
              then: {
                properties: {
                  [key]: thenSchema,
                },
                required: thenSchema.optional ? [] : [key],
              },
              else: elseSchema
                ? {
                    properties: {
                      [key]: elseSchema,
                    },
                    required: elseSchema.optional ? [] : [key],
                  }
                : {},
            });
          } else {
            props[key] = properties[key].getJSONSchema();
          }
        }
        const obj = {
          type: "object",
          properties: props,
          required,
          allOf: allOf.length ? allOf : undefined,
        };
        return obj;
      },
      getTS: (compiler) => {
        return `{ ${Object.entries(properties)
          .map(([name, subtype]) => `${name}: ${subtype.getTS(compiler)}`)
          .join("\n")} }`;
      },
    } as TRecord<T>;
  }
);

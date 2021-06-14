import { Schema, Static, TUndefined, createType } from "../base";

export interface TOptional<T extends Schema<any, any>>
  extends Schema<any, Static<T> | undefined> {
  static: Static<T> | undefined;
  type: "optional";
}

/** Creates a json schema optional validator. Statically resolves to a T | undefined only when wrapped in an object. */
export const Optional = createType(
  <T extends Schema<any, any>>(subtype: T): TOptional<T> => {
    return {
      ...subtype,
      optional: true,
      getJSONSchema: () => {
        return {
          ...subtype.getJSONSchema(),
          optional: true,
        };
      },
      getTS: (compiler) => "(" + subtype.getTS(compiler) + " | void)",
    } as TOptional<T>;
  }
);

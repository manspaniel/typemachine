import { Schema, Static, TUndefined, createType } from "../base";

export interface TField<T extends Schema<any, any>>
  extends Schema<any, Static<T>> {
  static: Static<T>;
  field: {
    label?: string;
    note?: string;
    documentation?: string;
  };
}

type FieldArgs = {
  label?: string;
  note?: string;
  documentation?: string;
};

/** Creates a json schema optional validator. Statically resolves to a T | undefined only when wrapped in an object. */
export const Field = createType(
  <T extends Schema<any, any>>(type: T, args: FieldArgs): TField<T> => {
    return {
      ...type,
      field: {
        ...args,
      },
      subtype: type,
      getJSONSchema: () => {
        return {
          ...type.getJSONSchema(),
        };
      },
      getTS: () => "any",
    } as TField<T>;
  }
);

import { Schema, Static, TUndefined, createType } from "../base";
import { TRecord } from "./record";

export interface TPartial<T extends TRecord<any>>
  extends Schema<any, Static<T> | undefined> {
  static: Partial<Static<T>> | undefined;
  type: "record";
}

/** Creates a json schema optional validator. Statically resolves to a T | undefined only when wrapped in an object. */
export const Partial = createType(
  <T extends TRecord<any>>(subtype: T): TPartial<T> => {
    return {
      ...subtype,
      getJSONSchema: () => {
        return {
          ...subtype.getJSONSchema(),
          required: undefined,
        };
      },
      getTS: (compiler) => "(" + subtype.getTS(compiler) + " | void)",
    } as TPartial<T>;
  }
);

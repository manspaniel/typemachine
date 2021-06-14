import { Schema, Static, createType } from "../base";

export interface TDictionary<T extends Schema<any, any>>
  extends Schema<"dictionary", { [key: string]: Static<T> }> {
  type: "dictionary";
  valueType: T;
}

/** Creates a json schema dictionary with string keys. Statically resolves to an TDictionary<T> */
export const Dictionary = createType(
  <T extends Schema<any, "dictionary">>(
    type: T = undefined as any as T
  ): TDictionary<T> => {
    return {
      type: "dictionary",
      valueType: type,
      getJSONSchema: () => ({
        type: "object",
        additionalProperties: type.getJSONSchema(),
      }),
      getTS: (compiler) =>
        `{ [key: string]: ${type ? type.getTS(compiler) : "any"}}`,
    } as TDictionary<T>;
  }
);

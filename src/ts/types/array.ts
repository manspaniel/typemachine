import { schemaFromJSON } from "../../schemaFromJSON";
import { Schema, Static, AnyType, createType } from "../base";

export interface TArray<T extends Schema<any, any>>
  extends Schema<"array", Array<Static<T>>> {
  type: "array";
  items: T;
}

// export function Array<T extends Schema<any, any>>(
//   type: T = (undefined as any) as T
// ): TArray<T> {
//   return {
//     type: "array",
//     items: type === undefined ? {} : type,
//     getJSONSchema: () => ({
//       type: "array",
//       items: type === undefined ? {} : type.getJSONSchema(),
//     }),
//     getTS: (compiler) => type.getTS(compiler) + "[]",
//   } as TArray<T>;
// }

export const Array = createType(
  <T extends AnyType>(type: T): TArray<T> => {
    return {
      type: "array",
      items: type === undefined ? {} : type,
      getJSONSchema: () => ({
        type: "array",
        items: type === undefined ? {} : type.getJSONSchema(),
      }),
      getTS: (compiler) => type.getTS(compiler) + "[]",
    } as TArray<T>;
  },
  {
    argsFromJSON: (subtype) => {
      return [schemaFromJSON(subtype)] as const;
    },
  }
);

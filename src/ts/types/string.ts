import { createType, Schema } from "../base";

export interface TString extends Schema<"string", string> {
  type: "string";
}

// export interface TPattern extends Schema<"string", string> {
//   type: "string";
//   pattern: string;
// }

/** Creates a json schema string type. Statically resolves to type 'string' */
export const String = createType((): TString => {
  return {
    type: "string",
    getJSONSchema: () => ({ type: "string" }),
    getUI: (scope) => ({ type: "text", scope }),
    getTS: (compiler) => "string",
  } as TString;
});

/** Creates a json schema pattern validator. Statically resolves to type 'string' */
// export function Pattern(regex: RegExp): TString {
//   return ({
//     type: "string",
//     pattern: regex.source,
//     getJSONSchema: () => ({ type: "string", pattern: regex.source }),
//     getTS: () => "string"
//   } as any) as TString
// }

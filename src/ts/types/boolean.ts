import { createType, Schema } from "../base";

export interface TBoolean extends Schema<"boolean", boolean> {
  type: "boolean";
}

/** Creates a json schema boolean type. Statically resolves to type 'boolean' */
export const Boolean = createType((): TBoolean => {
  return {
    type: "boolean",
    getJSONSchema: () => ({
      type: "boolean",
    }),
    getUI: (scope) => ({ type: "boolean", scope }),
    getTS: (compiler) => "boolean",
  } as TBoolean;
});

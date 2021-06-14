import { Schema, reflect, createType } from "../base";
import { TBoolean } from "./boolean";
import { TString } from "./string";
import { TNumber } from "./number";

export type TLiteralType = number | string | boolean;

export interface TLiteral<T extends TLiteralType> extends Schema<"literal", T> {
  literalType: TLiteralType;
}

/** creates boolean literal value. Statically resolves to the given type 'boolean' */
export function literalType(value: boolean): TBoolean;
/** creates string literal value. Statically resolves to the given type 'string' */
export function literalType(value: string): TString;
/** creates number literal value. Statically resolves to the given type 'number' */
export function literalType(value: number): TNumber;
/** Creates a json schema literal validator for the given literal value. Statically resolves to the given type 'boolean' or 'string' or 'number' */
export function literalType<T extends TLiteralType>(
  value: T
): TString | TNumber | TBoolean {
  const type = reflect(value);
  switch (type) {
    case "number":
      return {
        type,
        const: value,
        getJSONSchema: () => {
          return {
            type,
            const: value,
          };
        },
        getTS: () => String(value),
      } as any as TNumber;
    case "boolean":
      return {
        type,
        const: value,
        getJSONSchema: () => {
          return {
            type,
            const: value,
          };
        },
        getTS: () => (value ? "true" : "false"),
      } as any as TBoolean;
    case "string":
      return {
        type,
        const: value,
        getJSONSchema: () => {
          return {
            type,
            const: value,
          };
        },
        getTS: () => JSON.stringify(String(value)),
      } as any as TString;
    default:
      throw Error("Literal only allows for string, number and boolean values.");
  }
}

export const Literal = createType(literalType);

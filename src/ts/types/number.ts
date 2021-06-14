import { createType, Static, Schema } from "../base";

// export interface UNumber extends UBase<'uinumber'> {
//   type: 'uinumber'
//   multipleOf?: number
// }
//
// export interface URange extends UBase<'uirange'> {
//   type: 'uirange'
// }
//
// export interface JNumber extends JBase<'number', number> {
//   type: 'number'
//   multipleOf?: number
//   maximum?: number
//   minimum?: number
//   exclusiveMaximum?: number
//   exclusiveMinimum?: number
// }

export interface TNumber extends Schema<"number", number> {
  type: "number";
}

// export interface TRange extends Schema<'number', number> {
//   type: 'number'
//   minimum: number
//   maximum: number
// }

/** Creates a json schema number type. Statically resolves to type 'number' */
type NumberOptions = {
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
};

export const Number = createType((opts?: NumberOptions): TNumber => {
  return {
    getJSONSchema: () => ({
      type: "number",
      ...opts,
    }),
    getUI: (scope) => ({ type: "number", scope: scope, ...opts }),
    getTS: (compiler) => "number",
  } as TNumber;
});

/** Creates a json schema range validator. Statically resolves to type 'number' */
// export function Range(minimum: number, maximum: number): TRange {
//   return {
//     type: 'number',
//     minimum,
//     maximum,
//     getJSONSchema: () => ({ type: 'number', minimum, maximum })
//   } as TRange
// }

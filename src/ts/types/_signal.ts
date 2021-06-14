// import { Schema, Static, TUndefined } from "../base";

// type SignalDirection = "IN" | "OUT" | "BOTH";

// export interface TSignal<T extends Schema<any, any>>
//   extends Schema<any, Static<T>> {
//   static: Static<T>;
//   subtype: T;
//   direction: SignalDirection;
//   field: {
//     label?: string;
//     documentation?: string;
//   };
// }

// type FieldArgs = {
//   direction: SignalDirection;
//   label?: string;
//   documentation?: string;
// };

// /**  */
// export function Signal<T extends Schema<any, any>>(
//   type: T,
//   args: FieldArgs
// ): TSignal<T> {
//   return {
//     type: "signal",
//     field: {
//       label: args.label,
//       documentation: args.documentation,
//     },
//     direction: args.direction,
//     subtype: type,
//     getJSONSchema: () => {
//       return {
//         stream: {
//           direction: args.direction,
//           subtype: type.getJSONSchema(),
//         },
//       };
//     },
//     getUI: (scope) => ({
//       type: "signal",
//       scope,
//       direction: args.direction,
//       title: args.label,
//       ui: type.getUI(scope),
//     }),
//   } as TSignal<T>;
// }

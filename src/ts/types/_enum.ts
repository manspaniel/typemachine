// import { Schema, Static, distinct, reflect } from "../base";
// import { TLiteralType } from "./literal";

// // type TAnyEnum = TEnum1<any> | TEnum2<any, any>
// //
// export interface TEnum<T> extends Schema<"enum", T> {
//   static: T;
//   type: "enum";
//   literalType: string;
//   enum: T[];
// }

// export interface TEnum1<T1 extends TLiteralType> extends TEnum<T1> {
//   enum: [T1];
// }
// export interface TEnum2<T1 extends TLiteralType, T2 extends TLiteralType>
//   extends TEnum<T1 | T2> {
//   enum: [T1, T2];
// }
// export interface TEnum3<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType
// > extends TEnum<T1 | T2 | T3> {
//   enum: [T1, T2, T3];
// }
// export interface TEnum4<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType
// > extends TEnum<T1 | T2 | T3 | T4> {
//   enum: [T1, T2, T3, T4];
// }
// export interface TEnum5<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType
// > extends TEnum<T1 | T2 | T3 | T4 | T5> {
//   enum: [T1, T2, T3, T4, T5];
// }
// export interface TEnum6<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType
// > extends TEnum<T1 | T2 | T3 | T4 | T5 | T6> {
//   enum: [T1, T2, T3, T4, T5, T6];
// }
// export interface TEnum7<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType,
//   T7 extends TLiteralType
// > extends TEnum<T1 | T2 | T3 | T4 | T5 | T6 | T7> {
//   enum: [T1, T2, T3, T4, T5, T6, T7];
// }
// export interface TEnum8<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType,
//   T7 extends TLiteralType,
//   T8 extends TLiteralType
// > extends TEnum<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8> {
//   enum: [T1, T2, T3, T4, T5, T6, T7, T8];
// }

// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<T1 extends TLiteralType>(t1: T1): TEnum1<T1>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<T1 extends TLiteralType, T2 extends TLiteralType>(
//   t1: T1,
//   t2: T2
// ): TEnum2<T1, T2>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType
// >(t1: T1, t2: T2, t3: T3): TEnum3<T1, T2, T3>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType
// >(t1: T1, t2: T2, t3: T3, t4: T4): TEnum4<T1, T2, T3, T4>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType
// >(t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): TEnum5<T1, T2, T3, T4, T5>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType
// >(
//   t1: T1,
//   t2: T2,
//   t3: T3,
//   t4: T4,
//   t5: T5,
//   t6: T6
// ): TEnum6<T1, T2, T3, T4, T5, T6>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType,
//   T7 extends TLiteralType
// >(
//   t1: T1,
//   t2: T2,
//   t3: T3,
//   t4: T4,
//   t5: T5,
//   t6: T6,
//   t7: T7
// ): TEnum7<T1, T2, T3, T4, T5, T6, T7>;
// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum<
//   T1 extends TLiteralType,
//   T2 extends TLiteralType,
//   T3 extends TLiteralType,
//   T4 extends TLiteralType,
//   T5 extends TLiteralType,
//   T6 extends TLiteralType,
//   T7 extends TLiteralType,
//   T8 extends TLiteralType
// >(
//   t1: T1,
//   t2: T2,
//   t3: T3,
//   t4: T4,
//   t5: T5,
//   t6: T6,
//   t7: T7,
//   t8: T8
// ): TEnum8<T1, T2, T3, T4, T5, T6, T7, T8>;

// /** Creates a json schema enum validator for the given literal values. Statically resolves to a type union for the given types */
// export function Enum(...items: TLiteralType[]) {
//   if (items.length === 0) {
//     throw Error("Enum types must have at least one value.");
//   }
//   const typenames = items.map((item) => reflect(item));
//   if (distinct(typenames).length > 1) {
//     throw Error("Enum types must all be of the same literal type.");
//   }
//   const typename = typenames[0];
//   return {
//     type: "enum",
//     getJSONSchema: () => {
//       switch (typename) {
//         case "number":
//           return { type: "number", enum: items } as any;
//         case "boolean":
//           return { type: "boolean", enum: items } as any;
//         case "string":
//           return { type: "string", enum: items } as any;
//         default:
//           throw Error(
//             "Enum types only allows for string, number and boolean values."
//           );
//       }
//     },
//     getTS: () => {
//       switch (typename) {
//         case "number":
//           return "(" + items.map((item) => Number(item)).join(" | ") + ")";
//         case "boolean":
//           return (
//             "(" +
//             items.map((item) => (item ? "true" : "false")).join(" | ") +
//             ")"
//           );
//         case "string":
//           return (
//             "(" +
//             items.map((item) => JSON.stringify(String(item))).join(" | ") +
//             ")"
//           );
//         default:
//           throw new Error(
//             "Enum types only allows for string, number and boolean values."
//           );
//       }
//     },
//   } as any;
// }

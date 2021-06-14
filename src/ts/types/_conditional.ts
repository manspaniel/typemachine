// import { AnyType, Schema, Static, TUndefined } from '../base'

// export interface TConditional<T> extends Schema<'conditional', T> {
//   static: T | null
//   type: 'conditional'
//   if: AnyType
//   then: AnyType
//   else: AnyType | undefined
// }

// /** Creates a json schema optional validator. Statically resolves to a T | undefined only when wrapped in an object. */
// export function Conditional<T1 extends AnyType, T2 extends AnyType>(
//   _if: AnyType,
//   _then: T1,
//   _else: T2
// ): TConditional<Static<T1> | Static<T2>>
// export function Conditional<T extends AnyType>(_if: AnyType, _then: T): TConditional<Static<T> | void>
// export function Conditional(_if: AnyType, _then: AnyType, _else: AnyType = undefined) {
//   return {
//     type: 'conditional',
//     if: _if as AnyType,
//     then: _then as AnyType,
//     else: _else as AnyType,
//     getJSONSchema: () => {
//       return {
//         if: _if.getJSONSchema(),
//         then: _then.getJSONSchema(),
//         else: _else ? _else.getJSONSchema() : {}
//       }
//     }
//   } as unknown
// }

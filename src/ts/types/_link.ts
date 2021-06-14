// import { Schema, Static, Schema } from "../base";
// import { String } from "./string";
// import { Record } from "./record";
// import { TResource } from "./_resource";
// // import { Stack, Flex } from "../../controls/spec"

// type AnyObject = { [key: string]: any };

// export interface TLink<T extends keyof ResourceType>
//   extends Schema<
//     "link",
//     {
//       id: string;
//       type: string;
//       link?: string;
//       static?: ResourceType[T];
//     }
//   > {
//   static: {
//     id: string;
//     type: string;
//     link?: string;
//     static?: ResourceType[T];
//   };
//   name: T;
//   type: "link";
// }

// /** Creates a json schema object. Statically resolves to an object of the given property types. */
// export function Link<T extends keyof ResourceType>(name: T): TLink<T> {
//   return {
//     type: "link",
//     name: name,
//     getJSONSchema: () => {
//       const obj = {
//         type: "object",
//         properties: {
//           id: "string",
//           type: "string",
//           link: "string",
//         },
//         required: ["id", "type"],
//       };
//       return obj;
//     },
//     getTS: (compiler) => {
//       // compiler.addFragment(`
//       //   type APILink<T> = {
//       //     id: string, type: string, link?: string, static?: T
//       //   }
//       // `)
//       return `APILink<${name}>`;
//     },
//   } as TLink<T>;
// }

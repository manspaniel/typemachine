import { JSONSchema } from "./spec/json-schema";
import { UISchema } from "./spec/ui-schema";
import { TypeCompiler } from "../compiler";
import { ValidationResult, compileValidator } from "../validate";

type ReflectedTypeName =
  | "undefined"
  | "null"
  | "function"
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "array"
  | "object";

/** Returns the underlying type of a value */
export function reflect(value: any): ReflectedTypeName {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "function") {
    return "function";
  }
  if (typeof value === "string") {
    return "string";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (typeof value === "boolean") {
    return "boolean";
  }
  if (typeof value === "object") {
    if (value instanceof Array) {
      return "array";
    }
    if (value instanceof Date) {
      return "date";
    }
  }
  return "object";
}

/** Filters a list of strings, returning only the distinct values */
export function distinct(items: string[]): string[] {
  return items.reduce<string[]>((acc, c) => {
    if (acc.indexOf(c) === -1) {
      acc.push(c);
    }
    return acc;
  }, []);
}

/**
 * Resolves a Schema<T> to a static TypeScript type.
 * Usage: Static<typeof MySchema>
 **/
export type Static<T extends Schema<any, any>> = T["static"];

/** Base interface for types, returned by type functions **/
export interface Schema<TName, T> {
  static: T;
  args: any;
  type: TName;
  optional?: boolean;
  getJSONSchema(): JSONSchema;
  getTS(compiler: TypeCompiler): string;
  getUI(scope: string): UISchema;
  validate(value: any): value is T;
  isCastableTo<F>(type: SchemaType<F>): boolean;
  castValue<F>(value: any, type: SchemaType<F>): F;
}

/** Any type or schema */
export type AnyType = Schema<any, any>;

/** Any type which has the static type of T */
export type SchemaType<T> = Schema<any, T>;

export interface TAny extends Schema<"any", any> {}
export interface TNever extends Schema<"never", never> {}
export interface TUndefined extends Schema<"undefined", undefined> {}
export interface TNull extends Schema<"null", null> {
  type: "null";
}

export type TypeConstructor<TName = any, TArgs extends any[] = any[], T = any> =
  (...args: TArgs) => Schema<TName, T>;

export type TypeStatics<T, TArgs extends any[]> = {
  argsFromJSON(...args: any[]): Readonly<TArgs>;
  validate(value: T): ValidationResult<T>;
};

export type TypeOptions<T, TArgs extends any[]> = {
  argsFromJSON?(...args: any[]): Readonly<TArgs>;
  validate?(value: T): ValidationResult<T>;
};

export type TypeFunction<
  TName extends string = any,
  TArgs extends any[] = any[],
  T extends any = any
> = TypeConstructor<TName, TArgs, T> & TypeStatics<T, TArgs>;

export type Type<
  TName extends string = any,
  TArgs extends any[] = any[],
  T extends any = any
> = TypeFunction<TName, TArgs, T> & TypeStatics<T, TArgs>;

/** Utility function for creating types */
export const createType = <TName extends string, TArgs extends any[], T>(
  func: TypeConstructor<TName, TArgs, T>,
  opts: TypeOptions<T, TArgs> = {}
) => {
  const t = ((...args: any) => {
    const schema = func(...args);
    schema.args = args;

    schema.validate = (value: any): value is T => {
      return true;
    };
    return schema;
  }) as Type<TName, TArgs, T>;

  t.argsFromJSON = (...args) => {
    return [] as any;
  };

  return t;
};

// /** Creates a json schema any type. Statically resolves to type 'any' */
// export function Any(): TAny {
//   return {
//     type: "any",
//     getJSONSchema: () => ({}),
//   } as TAny;
// }
// /** Creates a json schema null type. Statically resolves to type 'null' */
// export function Null(): TNull {
//   return {
//     type: "null",
//     getJSONSchema: () => ({ type: "null" }),
//   } as TNull;
// }

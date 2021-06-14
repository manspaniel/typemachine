import { AnyType, createType, Schema } from "./base";

type TypeSet = { [key: string]: (...args: any[]) => Schema<any, any> };

export interface TypeSystem<TTypes extends TypeSet> {
  hasType(name: string): boolean;
  getAll(): TTypes;
  getType<TName extends string>(
    type: TName
  ): TName extends keyof TTypes ? TTypes[TName] : Schema<any, any> | null;
  withType<TName, TType extends AnyType>(
    name: string,
    type: TType,
    external?: boolean
  ): void;
  withTypes<TNewTypes>(
    types: TNewTypes,
    external?: boolean
  ): TypeSystem<TTypes & TNewTypes>;
}

export function createTypeSystem<T extends TypeSet>(
  types: T,
  externals: {} = {}
): TypeSystem<T> {
  return {
    getAll() {
      return types;
    },
    getType(name) {
      return (types[name] || null) as any;
    },
    hasType(name) {
      return name in types;
    },
    withType(name, type) {
      return createTypeSystem({ ...types, [name]: type });
    },
    withTypes(extraTypes, external = false) {
      return createTypeSystem({ ...types, ...extraTypes });
    },
  };
}

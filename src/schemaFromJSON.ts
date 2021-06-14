import { Schema, defaultTypes } from "./ts";
import { TypeFunction } from "./ts/base";

type TypeSet = { [key: string]: TypeFunction };

export function schemaFromJSON(payload: any, types: TypeSet = defaultTypes) {
  if (Array.isArray(payload)) {
    let [type, ...args] = payload;
    if (type in types === false) {
      throw new Error(`Unknown type '${type}' while decoding the schema`);
    } else {
      const t = types[type];
      if (t.argsFromJSON) {
        args = [...t.argsFromJSON(...args)];
      }
      return t(...args);
    }
  } else {
    throw new Error(
      "Expected an array in the form [type, ...args] when decoding the schema"
    );
  }
}

import { createTypeSystem } from "./type-system";

export { Schema, SchemaType, Static, AnyType } from "./base";

// The default type system
import * as defaultTypes from "./types";
const defaultTypeSystem = createTypeSystem(defaultTypes);

export { defaultTypes, defaultTypeSystem };

import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { Schema } from "./ts";

const ajv = new Ajv({
  coerceTypes: true,
});

const CachedValidator = Symbol("CachedValidator");

interface Validator<T> {
  (data: any): ValidationResult<T>;
}

export type ValidationResult<T> =
  | {
      valid: false;
      errors: ErrorObject[];
    }
  | {
      valid: true;
      value: T;
    };

export function compileValidator<T>(schema: Schema<any, T>): Validator<T> {
  const validate: ValidateFunction<any> = ajv.compile(schema.getJSONSchema());
  return (value: any) => {
    if (validate(value)) {
      return {
        valid: true,
        value: value,
      };
    } else {
      return {
        valid: false,
        errors: Array.isArray(validate.errors) ? validate.errors : [],
      };
    }
  };
}

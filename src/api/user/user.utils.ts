import { FieldsInput } from "../../utils/verify-empty-field";
import { User } from "./user.entity";

export function flattenObject(obj: any, prefix = ""): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      Object.assign(result, flattenObject(value, prefixedKey));
    } else {
      result[prefixedKey] = value;
    }
  }

  return result;
}

// Converte userData in FieldsInput
export function userToFieldsInput(
  user: User
): { name: string; value: unknown }[] {
  const flatUser = flattenObject(user);
  return Object.keys(flatUser).map((key) => ({
    name: key,
    value: flatUser[key],
  }));
}

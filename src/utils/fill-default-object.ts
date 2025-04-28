export function fillDefaults<T>(obj: Partial<T>, defaults: T): T {
  const result: any = {};

  for (const key in defaults) {
    const defaultValue = (defaults as any)[key];
    const objValue = (obj as any)[key];
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        typeof defaultValue === "object" &&
        defaultValue !== null &&
        !Array.isArray(defaultValue)
      ) {
        // Anche se objValue non esiste o è parziale, facciamo il merge ricorsivo
        result[key] = fillDefaults(objValue ?? {}, defaultValue);
      } else {
        result[key] = (obj as any)[key] ?? defaults[key];
      }
    } else {
      result[key] = defaults[key];
    }
  }

  return result;
}

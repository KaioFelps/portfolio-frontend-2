import type { FieldNamesMarkedBoolean, FieldValues } from "react-hook-form";

function isDirtyValue(dirty: unknown): boolean {
  if (typeof dirty === "boolean") return dirty;
  if (Array.isArray(dirty)) return dirty.some(isDirtyValue);
  if (dirty && typeof dirty === "object") {
    return Object.values(dirty).some(isDirtyValue);
  }
  return false;
}

export function getChangedFields<T extends FieldValues>(
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<T>>>,
  values: T,
): Partial<T> {
  const result: Partial<T> = {};

  const dirtyRecord = dirtyFields as Record<keyof T, unknown>;

  (Object.keys(dirtyRecord) as Array<keyof T>).forEach((key) => {
    const dirty = dirtyRecord[key];
    const value = values[key];

    if (dirty === undefined) return;

    if (Array.isArray(dirty)) {
      if (isDirtyValue(dirty)) {
        result[key] = value;
      }
      return;
    }

    if (dirty === true) {
      result[key] = value;
      return;
    }

    if (typeof dirty === "object" && dirty !== null) {
      type Child = T[typeof key];
      const nested = getChangedFields<Child & FieldValues>(
        dirty as Partial<
          Readonly<FieldNamesMarkedBoolean<Child & FieldValues>>
        >,
        value as Child & FieldValues,
      );
      if (Object.keys(nested).length > 0) {
        result[key] = nested as T[typeof key];
      }
    }
  });

  return result;
}

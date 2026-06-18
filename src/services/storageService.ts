export function getSafeStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

export function readStorage<T>(key: string, fallback: T): T {
  const storage = getSafeStorage();

  if (!storage) {
    return fallback;
  }

  try {
    const rawValue = storage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  const storage = getSafeStorage();

  if (!storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string) {
  const storage = getSafeStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(key);
}

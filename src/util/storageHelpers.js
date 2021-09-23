// Helper function for working with localStorage
// In this case - to store saved colorMode preferences

export const loadFromLocalStorage = (field) => {
  if (typeof window !== undefined) {
    try {
      const serialized = localStorage.getItem(field);
      if (!serialized) throw new Error(`${field} not found in LS`);
      return JSON.parse(serialized);
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};

export const saveToLocalStorage = (field, value) => {
  if (typeof window !== undefined) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(field, serialized);
      return true;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};

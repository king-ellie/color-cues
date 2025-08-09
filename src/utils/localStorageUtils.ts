export const saveSettings = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadSettings = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

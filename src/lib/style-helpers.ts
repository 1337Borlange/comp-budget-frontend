export const getClasses = (input: { [key: string]: boolean }): string => {
  let classes: string[] = [];
  Object.entries(input).forEach(([key, isTrue]) => {
    if (isTrue) classes.push(key);
  });
  return classes.join(' ');
};

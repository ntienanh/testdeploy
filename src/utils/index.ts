export const convertCharName = (name: string) => {
  const rs = name
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join(' ');

  return rs.toUpperCase();
};

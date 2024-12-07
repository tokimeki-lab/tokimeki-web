export const dateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0].replaceAll('-', '.')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function format(format: string, ...args: any[]): string {
  return format.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}

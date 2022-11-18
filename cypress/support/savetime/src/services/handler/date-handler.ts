export const DELIMITER = ':'

function formatDate(date: Date) {
  return date.toISOString().slice(0, 16).replace('T', ' ')
}

export function getFormatDateWithPosition(date: Date, position: number) {
  return position + DELIMITER + ' ' + formatDate(date)
}

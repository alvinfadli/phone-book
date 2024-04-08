// convert timestamp into DD-MM-YYY at HH:MM:SS
export function parseTimestamp(timestamp?: string): string {
  if (!timestamp) {
    return "Invalid Timestamp";
  }
  const dateObj = new Date(timestamp);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear());

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} at ${hours}:${minutes}:${seconds}`;
}

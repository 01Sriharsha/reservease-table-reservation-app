export function generateSlug(str: string) {
  // Remove special characters, replace spaces with hyphens, and convert to lowercase
  return str
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
}

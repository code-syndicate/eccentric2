const { createHash } = await import("node:crypto");

export function hashPassword(password) {
  const hash = createHash("sha256");

  hash.update(password);
  return hash.digest("hex");
}

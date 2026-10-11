/** The only email domain allowed to sign up or sign in. */
export const IIITL_EMAIL_DOMAIN = "iiitl.ac.in";

/**
 * Normalizes an email address for storage and lookup.
 *
 * Emails are compared case-insensitively everywhere in the auth flows, so every
 * read and write goes through this helper. It mirrors Auth.js's default
 * normalizer (NFKC, lowercase, trim) so magic-link users line up with the rest.
 *
 * @param value - A raw form value or string.
 * @returns The normalized email, or `null` when the value is not a non-empty string.
 */
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.normalize("NFKC").trim().toLowerCase();
  return email.length > 0 ? email : null;
}

/**
 * Checks that an (already normalized) email belongs to the IIITL domain.
 *
 * @param email - A normalized email address.
 * @returns `true` when the address is a single `@iiitl.ac.in` mailbox.
 */
export function isIiitlEmail(email: string | null | undefined): email is string {
  if (!email) return false;
  const parts = email.split("@");
  return parts.length === 2 && parts[0].length > 0 && parts[1] === IIITL_EMAIL_DOMAIN;
}

/**
 * Picks the client IP from proxy headers for rate limiting.
 *
 * `x-forwarded-for` can hold a comma-separated chain; the first entry is the
 * client. Falls back to `x-real-ip`, then a shared bucket.
 *
 * @param headers - The incoming request headers.
 * @returns The client IP, or `"unknown"` when none is present.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

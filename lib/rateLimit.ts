const requests = new Map<string, number[]>()

export function checkRateLimit(email: string) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour

  if (!requests.has(email)) {
    requests.set(email, [])
  }

  const timestamps = requests.get(email)!

  // remove old timestamps
  const filtered = timestamps.filter((t) => now - t < windowMs)

  if (filtered.length >= 5) {
    return { allowed: false }
  }

  filtered.push(now)
  requests.set(email, filtered)

  return { allowed: true }
}
export async function apiRequest(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  })

  if (!res.ok) {
    throw new Error("API request failed")
  }

  return res.json()
}
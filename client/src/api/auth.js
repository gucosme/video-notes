const BASE_URL = "http://localhost:3001";

export async function getToken(name = "James") {
  const res = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name })
  });
  const { token } = await res.json();

  return token;
}

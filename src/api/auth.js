const BASE_URL = "http://192.168.88.56:3000";

export async function getToken() {
  const res = await fetch(`${BASE_URL}/token`);
  const { token } = await res.json();

  return token;
}

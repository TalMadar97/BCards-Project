export function headers(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  return headers;
}

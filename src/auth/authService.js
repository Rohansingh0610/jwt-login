// Logic Layer: Authentication Service
// Simulates server-side authentication, JWT generation, verification, and client-side storage management.

export const USERS = [
  { userId: 1, username: "admin", password: "admin123", role: "admin" },
  { userId: 2, username: "rahul", password: "user123", role: "user" }
];

export const TOKEN_KEY = "jwt_token";

// Helper function: Base64URL encode using btoa, replacing '+' with '-', '/' with '_', and stripping '=' padding
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Helper function: Base64URL decode restoring '+', '/', padding with '=', and using atob
function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return atob(base64);
}

// Generates a simulated JWT formatted as "header.payload.signature"
// Note: In real-world production applications, the backend server signs the token
// using HMAC-SHA256 (or asymmetric algorithms like RS256) with a secret key known only
// to the server. The signature prevents clients or attackers from modifying the header or payload.
export function generateToken(user) {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // 1 hour validity

  const payload = {
    userId: user.userId,
    role: user.role,
    iat: iat,
    exp: exp
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = "simulated_signature";

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Validates user credentials against the simulated database, generates and stores a JWT
export function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const token = generateToken(user);
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

// Retrieves the stored JWT from browser localStorage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Clears the stored JWT from browser localStorage
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decodes the payload section of a JWT and returns the parsed object, or null on error
export function decodeToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    const payloadJson = base64UrlDecode(parts[1]);
    return JSON.parse(payloadJson);
  } catch {
    return null;
  }
}

// Returns the decoded user payload if a valid, unexpired token exists; otherwise clears storage and returns null
export function getValidUser() {
  const token = getToken();
  if (!token) {
    return null;
  }

  const payload = decodeToken(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload && payload.exp && payload.exp > currentTime) {
    return payload;
  }

  logout();
  return null;
}

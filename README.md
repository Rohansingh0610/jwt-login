# JWT Login (React + Vite)

A clean, lightweight React application demonstrating client-side JSON Web Token (JWT) authentication using a simulated backend and three-tier architecture.

---

## 📖 What is a JWT?

A **JSON Web Token (JWT)** is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

A JWT consists of three parts separated by dots (`.`):

```
header.payload.signature
```

1. **Header**: Contains metadata about the token type and the hashing algorithm used:
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```
   Encoded as a Base64URL string.

2. **Payload**: Contains the claims (statements about the entity, typically the user, and additional data):
   ```json
   {
     "userId": 1,
     "role": "admin",
     "iat": 1759123200,
     "exp": 1759126800
   }
   ```
   Encoded as a Base64URL string.

3. **Signature**:
   - In production backends, the signature is computed by hashing the Base64URL-encoded header and payload with a secret key: `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`.
   - In this simulated project, the signature is represented by `"simulated_signature"`.

---

## 📁 Folder Structure

```
jwt-login/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                 -> Entry point, mounts <App /> into #root
    ├── App.jsx                  -> Gatekeeper: conditional render for Login vs Dashboard
    ├── App.css                  -> Application styling and card design system
    ├── auth/
    │   └── authService.js       -> All authentication logic (no UI in this file)
    └── components/
        ├── Login.jsx            -> Controlled login form UI
        └── Dashboard.jsx        -> Protected user dashboard UI
```

---

## 🏛️ Architecture Layers

The application strictly separates responsibilities into three distinct layers:

1. **Presentation Layer (`Login.jsx`, `Dashboard.jsx`)**:
   - Pure UI components containing no direct authentication verification or storage manipulation logic.
   - Delegates user actions (login, logout) to the logic layer and receives decoded user state via props.
2. **Logic Layer (`auth/authService.js`)**:
   - Manages simulated user credentials (`USERS`), credential validation, Base64URL encoding/decoding, JWT creation, token expiry checks, and token decoding.
   - Encapsulates all business rules.
3. **Storage Layer (`localStorage`)**:
   - Persists the active session token in browser `localStorage` under the key `"jwt_token"`.

---

## 🔄 Login & Session Workflow

1. **App Mount**:
   - `App.jsx` initializes state with `useState(getValidUser())`.
   - `getValidUser()` inspects `localStorage` for `"jwt_token"`.
   - If a token exists and `exp > Math.floor(Date.now() / 1000)`, the token payload is decoded and returned, rendering `<Dashboard />` immediately (session persistence across refreshes).
   - If no token exists or it is expired, `logout()` clears storage and `<Login />` is rendered.
2. **Login Attempt**:
   - The user inputs credentials and submits `<Login />`.
   - `authService.login(username, password)` validates credentials against the `USERS` database.
   - If credentials are invalid, an error is thrown and displayed in red.
   - If credentials match, a simulated JWT is created (`header.payload.signature`), stored in `localStorage`, and `onLoginSuccess()` is invoked.
3. **Protected Dashboard**:
   - `App.jsx` updates its `user` state with the decoded payload.
   - Displays `User ID` and `Role`.
   - If `role === "admin"`, a green **"Admin panel unlocked."** banner is shown. If `role === "user"`, this banner is omitted.
   - Displays the raw JWT string stored in `localStorage`.
4. **Logout**:
   - Clicking **Logout** executes `authService.logout()`, removing `"jwt_token"` from `localStorage`, and calls `onLogout()`, reverting the view to `<Login />`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# Navigate to the project directory
cd jwt-login

# Install dependencies (if not already installed)
npm install

# Start the local development server
npm run dev
```

---

## 🧪 Test Credentials

| Username | Password | Role | Features |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | `admin` | Shows admin message & token |
| `rahul` | `user123` | `user` | Standard user dashboard |
| *(invalid)* | *(wrong)* | N/A | Displays "Invalid username or password" |

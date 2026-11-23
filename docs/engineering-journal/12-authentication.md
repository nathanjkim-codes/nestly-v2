# 12. Authentication & Authorization

**Status:** Completed (Development) — Production Testing Pending

**Last Updated:** November 22, 2026

**Tech Stack:** React, React Router, Node.js, Express, PostgreSQL, Argon2, express-session

## Feature Purpose

I implemented authentication so parents can create accounts, log in, and access their own children's records in Nestly.

---

## Goal

Build a login system that identifies users, remembers their sessions, and protects their data.

---

## Problem

Before authentication, Nestly couldn't identify which parent was using the application.

I needed to make sure users could log in securely and could not access another parent's records.

I also had problems with missing session cookies, `401 Unauthorized` errors, and React protected routes during development.

---

## My Approach

### 1. Signup & Login

I created `SignupForm.jsx` and `LoginForm.jsx` using React.

Express checks the user's information, uses Argon2 to hash passwords, and stores accounts in PostgreSQL.

After a successful login, Express saves the user ID in a session.

### 2. Sessions & Cookies

I used `express-session` to manage login sessions.

The browser stores a cookie named `nestly.sid`.

I used `credentials: "include"` in React fetch requests so the browser can send the session cookie to Express.

### 3. Protected Routes & Authorization

I created `ProtectedRoute.jsx` to check the user's session using `GET /api/auth/me`.

I also used `requireAuth()` middleware and SQL ownership checks in Express to protect user data.

### 4. Testing & Debugging

I used Postman and Chrome DevTools to test authentication and fix problems.

**Issue 1 — Chrome Login (401)**

Login worked in Postman, but Chrome returned `401`. I learned that Postman and Chrome store cookies separately. I logged in through Chrome to fix it.

**Issue 2 — Missing Cookies (401)**

Growth, Sleep, and Feeding requests returned `401`. I checked the Network tab and found that I wrote `credential` instead of `credentials`. After fixing it, the APIs worked.

**Issue 3 — Add Child (400 & 401)**

The request failed because React sent `"girl"` while Express expected `"Girl"`. My browser session was also invalid. I fixed the data format and logged in again. The final `201` response for that test was not recorded.

**Issue 4 — Login Form Validation**

I initially placed validation outside `handleSubmit()`. I moved it inside the function so validation runs when the form is submitted.

**Issue 5 — ProtectedRoute**

I made a mistake with the nested route structure in `router.jsx`. I corrected the parent route and used `<Outlet />` to render protected pages.

**Issue 6 — Session Lost**

My session became invalid during development. A server restart may have cleared the in-memory session. I logged in again, but I did not confirm the exact cause.

**Issue 7 — Logout**

I learned how `req.session.destroy()` works and why the cookie name must match `nestly.sid`. I still need to test the complete logout process.

**Authorization Testing**

I used two Postman accounts to check whether User B could access User A's growth records.

1. GET returned `200` with an empty array.
2. POST returned `404`.
3. PUT returned `404`.
4. User A's original record was unchanged after the PUT test.
5. DELETE returned `404`.

The requests returned the expected responses. I still need to confirm the original record remains after DELETE.

---

## Technical Decisions

I chose session-based authentication so users don't need to log in for every request.

I used Argon2 instead of storing plaintext passwords.

I used React Router to protect private pages and Express middleware with SQL ownership checks to protect backend data.

---

## Key Concepts

- Authentication & Authorization
- Argon2 Password Hashing
- Sessions & Cookies
- Express Middleware
- React Router Protected Routes
- SQL Ownership Checks
- HTTP Status Codes
- Chrome DevTools & Postman

---

## Impact

Nestly now supports signup, login, authenticated sessions, and protected pages.

The backend can identify users and check ownership before returning their children's records.

---

## Reflection

I learned how React, Express, PostgreSQL, sessions, and cookies work together.

Debugging `401` errors helped me understand browser cookies and API requests.

I also learned that authentication checks who the user is, while authorization checks which records the user can access.

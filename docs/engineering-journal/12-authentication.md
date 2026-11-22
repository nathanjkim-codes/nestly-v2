# 12. Authentication & Authorization

**Status:** Completed (Development) — Production Testing Pending

**Last Updated:** November 22, 2026

**Tech Stack:** React, React Router, Node.js, Express, PostgreSQL, Argon2, express-session

---

## Feature Purpose

Nestly allows parents to track their children's growth, sleep, and feeding records.

I implemented authentication so parents can create accounts, log in, and access their own information.

## Goal

Build a login system that identifies users, remembers their sessions, and protects their children's records.

## Problem

Before authentication, Nestly couldn't reliably identify which parent was using the application.

For example, Parent A could potentially access Parent B's children's records.

I needed two types of protection:

- **Authentication:** Identify who the user is.
- **Authorization:** Check which children's records the user is allowed to access.

---

## My Approach

I implemented authentication using React, Express, PostgreSQL, Argon2, and express-session.

### 1. Signup

I created `SignupForm.jsx` using React state to manage form inputs and errors.

React sends the user's email and password to Express.

Express validates the information, hashes the password using Argon2, and saves the new account in PostgreSQL.

### 2. Login

I created `LoginForm.jsx` to allow users to log in.

Express looks up the account in PostgreSQL and verifies the password using:

```js
argon2.verify(user.password_hash, password);
```

If the credentials are correct, Express stores the user's ID in a session:

```js
req.session.userId = user.id;
```

The browser receives a session ID cookie named `nestly.sid`.

### 3. Sessions & Cookies

I used session-based authentication so users don't need to log in again for every API request.

In React, I used:

```js
credentials: "include"
```

This allows the browser to include the session cookie with cross-origin API requests.

Express uses the cookie to retrieve the session and identify the logged-in user.

### 4. Protected Routes

I created `ProtectedRoute.jsx` using React Router.

It checks the user's session through:

```text
GET /api/auth/me
```

If the user is authenticated, React renders the protected page using `<Outlet />`.

Otherwise, React redirects the user to `/login` using `<Navigate />`.

I also implemented `requireAuth()` in Express to protect backend API requests.

---

## Data Flow


1. User enters email and password
        
2. React LoginForm
        
3. POST /api/auth/login
        
4. Express finds user in PostgreSQL
        
5. Argon2 verifies password
        
6. Express creates session
        
7. Browser stores nestly.sid cookie
        
8. Browser sends cookie with future requests
        
9. Express checks req.session.userId
        
10. Backend checks data ownership
        
11. React receives permitted data


---

## Technical Decisions

**Session-Based Authentication**

I chose sessions so Express could recognize users across multiple requests without asking for their passwords each time.

**Password Hashing**

I used Argon2 instead of storing plaintext passwords.

**ProtectedRoute**

I created one shared route component instead of checking authentication separately on every page.

**Backend Protection**

I used Express middleware and ownership checks because protecting React pages alone does not secure the API.

---

## Testing & Debugging

I tested authentication using Postman, Chrome DevTools, and my React application.

### Test 1 — Signup & Login

I tested creating an account, duplicate email validation, and logging in with an existing account.

**Results:**

- New account registration worked.
- Duplicate emails returned an error.
- Valid login credentials returned a successful response.
- Express created an authenticated session.
- I also tested accessing Growth after login and refreshing the page while maintaining the session.

### Issue 1 — 401 Unauthorized: Chrome Login

**Problem**

My login API worked in Postman, but Chrome returned:

```text
GET /api/children → 401 Unauthorized
```

React displayed:

```text
Failed to load children
```

**Expected**

I expected React to retrieve the logged-in parent's children from PostgreSQL.

**How I Debugged It**

1. Opened Chrome DevTools and checked the Console.
2. Confirmed the Children API returned `401`.
3. Reviewed the `fetch()` request in `App.jsx`.
4. Confirmed that `credentials: "include"` was present.
5. Checked the Express CORS configuration.
6. Realized that I had logged in through Postman, not Chrome.

**Root Cause**

Postman and Chrome store cookies separately.

Although Postman had an authenticated session, Chrome did not.

`credentials: "include"` sends eligible cookies but doesn't automatically authenticate the user.

**Fix**

I sent a login request through Chrome DevTools and confirmed that Express accepted it.

Then I refreshed Nestly.

**Result**

The Children API worked, and the Dashboard displayed my selected child.

**What I Learned**

The browser must have its own authenticated session. A successful login in Postman does not automatically authenticate Chrome.

### Issue 2 — 401 Unauthorized: Growth, Sleep & Feeding

**Problem**

The Children API worked, but Growth, Sleep, and Feeding requests returned `401 Unauthorized`.

**Expected**

All three APIs should return the selected child's records.

**How I Debugged It**

1. Opened Chrome DevTools → Network.
2. Selected a failed Growth Records request.
3. Checked Request Headers.
4. Noticed that the `nestly.sid` cookie was missing.
5. Reviewed the fetch options in `App.jsx`.
6. Found a spelling mistake.

**Root Cause**

I wrote:

```js
credential: "include"
```

Instead of:

```js
credentials: "include"
```

Because the option name was incorrect, the browser did not include the session cookie in those cross-origin requests.

Express could not authenticate the requests.

**Fix**

I corrected the option in:

- `fetchGrowthRecords()`
- `fetchSleepRecords()`
- `fetchFeedingRecords()`

**Result**

After refreshing the browser, all three APIs returned data successfully.

**What I Learned**

A small typo can break frontend-backend communication without causing a JavaScript syntax error.

I learned to inspect HTTP requests before assuming the backend was broken.

### Issue 3 — 400 & 401 Errors: Add Child

**Problem**

When I tried to add a child, the POST request failed.

I encountered two errors:

```text
400 Bad Request
401 Unauthorized
```

**How I Debugged It**

1. Opened Chrome DevTools → Network.
2. Checked the failed request's Response.
3. Found an `Invalid gender` validation error.
4. Checked the request Payload.
5. Found that React sent `"girl"` while Express expected `"Girl"`.
6. Also discovered that my Chrome session was no longer valid.

**Root Cause**

The `400` error was caused by inconsistent values between the frontend and backend.

The `401` error was caused by an invalid session. Restarting the development server may have cleared the in-memory session.

**Fix**

I updated gender handling to use consistent values and logged in again through Chrome.

**Result**

Authentication worked again. My original debugging notes did not confirm the final `201 Created` response for this particular Add Child test.

**What I Learned**

I learned to distinguish different HTTP errors:

- `400` — Invalid request data.
- `401` — Authentication is required or invalid.
- `201` — Resource successfully created.

I also learned that frontend and backend validation must agree on data formats.

---

## Key Concepts

- Authentication vs. Authorization
- Argon2 Password Hashing
- Sessions & Cookies
- Express Middleware
- `req.session.userId`
- `credentials: "include"`
- React Router Protected Routes
- HTTP Status Codes
- Chrome DevTools
- Postman
- API Debugging

---

## Impact

Nestly now supports account creation, login, authenticated sessions, and protected application routes.

The backend can identify authenticated users and apply ownership checks when accessing children's data.

This provides the foundation for supporting multiple parent accounts.

---

## Reflection

Implementing authentication helped me understand how React, Express, PostgreSQL, sessions, and cookies work together.

I learned that authentication identifies the user, while authorization controls which records the user can access.

The most valuable experience was debugging `401 Unauthorized` errors.

I learned how to inspect network requests, identify missing cookies, and trace problems between the frontend and backend instead of guessing.

---

## Next Steps

- Configure production cookies and persistent session storage.
- Verify ownership checks for all protected API endpoints.
- Test authentication and logout after deployment.
- Complete production security and session testing.
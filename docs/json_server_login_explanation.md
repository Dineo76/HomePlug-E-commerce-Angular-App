# How the App Handles Login, State, and Data Storage with JSON Server

> **TL;DR** – When you sign in, the app talks to a tiny local fake‑API (JSON Server) to check your email/password, remembers that you’re logged in, and saves a small note in your browser so the app can keep you signed in and keep your cart between visits.

---

## 1. Where the login logic lives

The **`LoginComponent`** (`src/app/Components/login/login.ts`) runs when you click the **Login** button.

| What it does | How it does it |
|--------------|----------------|
| Collects the email & password you typed | Two‑way binding (`[(ngModel)]`) copies the values into the component’s `email` and `password` properties.
| Checks that the fields are not empty | The `validate()` method sets human‑readable error messages (`emailError`, `passwordError`).
| Sends the credentials to the server | Calls `this.authService.login(this.email, this.password)`.
| Stores a tiny user record locally | If the server returns success, the code writes a JSON string to `localStorage.setItem('user', …)`.
| Updates the UI to show you’re logged in | Emits a `successLogin` event that the header listens for, which flips the “Profile” icon into a logged‑in state.

### Why a **Component**?
Components keep UI logic isolated. Putting this code directly in the HTML would make the page messy and hard to test. Angular components give us a clean, reusable place for this logic.

---

## 2. Communicating with JSON Server

The **`AuthService`** (`src/app/Services/auth.ts`) talks to a local mock API (JSON Server) instead of Firebase:

```ts
async login(email: string, password: string) {
  const api = environment.authApi; // e.g. http://localhost:3000
  const users = await firstValueFrom(
    this.http.get<any[]>(`${api}/users?email=${email}`)
  );
  if (!users || users.length === 0) throw new Error('User not found');
  const user = users[0];
  if (user.password !== password) throw new Error('Invalid email or password');
  return { user: { uid: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } };
}
```

* **JSON Server** is a tiny Node.js tool that serves a plain `db.json` file as a REST‑like API. It lets us **imitate a real back‑end** without needing a cloud service.
* The code uses Angular’s `HttpClient` to make ordinary HTTP GET/POST requests to `http://localhost:3000/users`.

### Why not write our own HTTP logic?
Writing raw `fetch` calls would work but we would lose all the conveniences Angular provides:
* Automatic **type‑checking** (`firstValueFrom` returns a typed array).
* Built‑in **error handling** and **observable** integration.
* Consistent **dependency injection** (the `HttpClient` is injected once and reused).

### Why JSON Server instead of Firebase?
* **No external credentials** – JSON Server runs locally, so we don’t need to manage API keys or worry about exposing them.
* **Simpler for development** – It’s just a file (`db.json`). Adding a new user is a one‑line edit.
* **Predictable cost** – Firebase can incur usage charges; JSON Server is free and runs on the developer’s machine.

---

## 3. Remembering who you are – State Management

Two pieces work together:

1. **`AuthStateService`** (`src/app/Services/auth-state.ts`) – a tiny global store.
   ```ts
   user = signal<any | null>(null);
   isLoggedIn = computed(() => this.user() !== null);
   ```
   * **Signals** are Angular’s newest reactive primitive – when `user` changes, any UI that reads it updates automatically.
2. **`Header` component** reads this service to decide what to display (login button vs. profile avatar).

### Signals vs. Alternatives
* **Signals** are lightweight and require no manual subscription/unsubscription.
* Older approaches like **RxJS `BehaviorSubject`** work but need extra boilerplate to avoid memory leaks.
* Using signals makes the code **simpler** and the UI **instantaneously** reacts to login/logout.

---

## 4. Local Storage – keeping data across page reloads

When login succeeds, the component runs:

```ts
localStorage.setItem('user', JSON.stringify({
  uid,
  email: userCredential.user.email,
  firstName: userCredential.user.firstName || '',
  lastName: userCredential.user.lastName || ''
}));
```

* **`localStorage`** is a browser‑provided key‑value store that persists even after you close the tab.
* The **header** later reads this value in `checkLoginStatus()` to repopulate the UI when the app starts.

### Why not use cookies or a server session?
* **Cookies** would be sent with every request, increasing bandwidth and potentially exposing data.
* **Server sessions** require a real back‑end to store state; this app is a single‑page front‑end that wants to stay fast and offline‑friendly. `localStorage` is a lightweight, client‑only solution for the tiny payload we need.

---

## 5. The whole flow (step‑by‑step)

1. **User clicks “Login”.**
2. `LoginComponent.validate()` checks the form.
3. If OK, `AuthService.login()` contacts JSON Server.
4. JSON Server returns a **user credential** (UID, email, etc.).
5. `LoginComponent` stores a simplified user object in **localStorage**.
6. It also notifies the app (`successLogin.emit()`).
7. `Header` reads the **`AuthStateService`** signal – it sees a non‑null user, so `isLoggedIn` becomes true.
8. UI updates: profile avatar appears, cart/wishlist are linked to the user ID.

---

## 6. Summary for Non‑Technical Users

- **JSON Server** is like a tiny fake database that lives on your computer. It checks the email and password you type.
- The **login form** sends those details to this fake server.
- When the server says “You’re welcome”, the app writes a small note (`localStorage`) in your browser saying who you are.
- A **global state** (signals) watches that note; as soon as it sees a user, the rest of the site shows you as logged in.
- All of this happens instantly on the page, without re‑loading, and the note stays even if you close the browser, so you stay logged in next time you visit.

---

*This document was generated automatically to help you understand the inner workings of the login flow when using JSON Server. No code changes were made.*

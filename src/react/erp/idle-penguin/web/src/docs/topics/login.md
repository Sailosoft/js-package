```typescript
export const AuthService = {
  // Registration: Hash before saving to Dexie
  async register(username, password) {
    const passwordHash = await hashPassword(password);
    return await db.users.add({ username, passwordHash });
  },

  // Login: Hash before sending to "API"
  async login(username, password) {
    const hashedPassword = await hashPassword(password);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, hashedPassword }),
    });

    if (!response.ok) throw new Error("Auth Failed");

    const { token } = await response.json();
    localStorage.setItem("auth_token", token);
    return true;
  },

  // Authenticated Request
  async getPrivateData() {
    const token = localStorage.getItem("auth_token");

    const response = await fetch("/api/user/data", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) this.logout();
    return await response.json();
  },

  logout() {
    localStorage.removeItem("auth_token");
    window.location.reload(); // Clear app state
  },
};
```

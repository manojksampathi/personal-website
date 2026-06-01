/**
 * NextAuth v5 (Auth.js) configuration.
 *
 * Auth strategy: simple credentials, no DB.
 * Users live in AUTH_USERS_JSON env var as [{name, hash}] with bcrypt hashes.
 * To add/remove users: edit the env var in .env.local + Vercel dashboard.
 */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

type StoredUser = { name: string; hash: string };

function loadUsers(): StoredUser[] {
  try {
    // AUTH_USERS_B64 is base64-encoded JSON. We base64-encode to avoid Next.js
    // expanding the `$` characters in bcrypt hashes ($2b$10$...) as env var refs.
    const b64 = process.env.AUTH_USERS_B64;
    const rawJson = process.env.AUTH_USERS_JSON; // legacy fallback

    let json: string | undefined;
    if (b64) {
      json = Buffer.from(b64, "base64").toString("utf8");
    } else if (rawJson) {
      json = rawJson;
    }

    if (!json) {
      console.warn("[auth] AUTH_USERS_B64 not set — no users can sign in");
      return [];
    }

    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (u): u is StoredUser =>
        typeof u?.name === "string" && typeof u?.hash === "string"
    );
  } catch (e) {
    console.error("[auth] Failed to parse user list:", e);
    return [];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Use the legacy NEXTAUTH_SECRET name from .env.local for backwards compat.
  // v5 prefers AUTH_SECRET — set whichever you have.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true, // required for Vercel deploys + custom domain redirects

  providers: [
    Credentials({
      name: "Invite credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = String(credentials?.username ?? "").trim();
        const password = String(credentials?.password ?? "");
        if (!username || !password) return null;

        const users = loadUsers();
        const user = users.find(
          (u) => u.name.toLowerCase() === username.toLowerCase()
        );
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.hash);
        if (!ok) return null;

        return { id: user.name, name: user.name };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
    // 30-day sessions — once a recruiter logs in they don't have to do it again
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    // Force the JWT name to be the username (for display in the header)
    jwt: async ({ token, user }) => {
      if (user?.name) token.name = user.name;
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.name && session.user) {
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

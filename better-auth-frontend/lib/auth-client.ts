import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Your NestJS server URL
  baseURL: process.env.NEXT_PUBLIC_NESTJS_URL || "http://localhost:3001",
});

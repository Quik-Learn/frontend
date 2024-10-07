// utils/auth.ts
export function isProtectedRoute(pathname: string) {
  const authRegex = /^\/auth\/.*/; // Match any path that starts with /auth/
  return !authRegex.test(pathname); // Return true if it's a protected route, false for auth paths
}

// utils/auth.ts
export function isProtectedRoute(pathname: string) {
  const authRegex = /^\/auth\/.*/; // Match any path that starts with /auth/
  return !authRegex.test(pathname); // Return true if it's a protected route, false for auth paths
}
export const timeAgo = (dateString: string) => {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000, // seconds in a year
    month: 2592000, // seconds in a month (30 days)
    week: 604800, // seconds in a week
    day: 86400, // seconds in a day
    hour: 3600, // seconds in an hour
    minute: 60, // seconds in a minute
    second: 1, // seconds
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

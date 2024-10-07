// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isProtectedRoute } from '~/lib/helpers/paths';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  console.log(req);
  console.log(isProtectedRoute(pathname), pathname);

  console.log('here', req);
  return NextResponse.next();
}

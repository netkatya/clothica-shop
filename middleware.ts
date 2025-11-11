import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession, setCookiesOnResponse } from './lib/api/serverApi';

const publicRoutes = ['/auth', '/goods'];
const privateRoutes = ['/profile'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestCookies = request.cookies;
  const accessToken = requestCookies.get('accessToken')?.value;
  const refreshToken = requestCookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await checkServerSession(requestCookies);
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          if (isPublicRoute) {
            const response = NextResponse.redirect(new URL('/', request.url));
            return setCookiesOnResponse(response, setCookie);
          }
          if (isPrivateRoute) {
            const response = NextResponse.next();
            return setCookiesOnResponse(response, setCookie);
          }
        }
      } catch (error) {
        console.error('Помилка оновлення сесії в middleware:', error);
      }
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Якщо accessToken існує:
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:authType', '/profile/:path*', '/goods/:path*'],
};

import { nextServer } from './api';
import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { useAuthStore } from '../store/authStore';

export const checkServerSession = async (cookieStore: RequestCookies) => {
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error('User not found in auth store');
  }

  let cookieString = '';
  if (accessToken) cookieString += `accessToken=${accessToken}; `;
  if (refreshToken) cookieString += `refreshToken=${refreshToken}`;

  const res = await nextServer.post(
    '/auth/session',
    { phone: user.phone },
    {
      headers: {
        Cookie: cookieString,
      },
    }
  );
  return res;
};

interface CookieOptions {
  expires?: Date;
  path?: string;
  maxAge?: number;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

export function setCookiesOnResponse(
  response: NextResponse,
  setCookie: string | string[]
) {
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);

    const cookieName = Object.keys(parsed)[0];
    const cookieValue = parsed[cookieName];

    const options: CookieOptions = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
      httpOnly: 'HttpOnly' in parsed,
      sameSite: parsed.SameSite as 'strict' | 'lax' | 'none' | undefined,
      secure: 'Secure' in parsed,
    };

    if (cookieName && cookieValue) {
      response.cookies.set(cookieName, cookieValue, options);
    }
  }
  return response;
}

import { NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { logErrorResponse } from '../../../_utils/utils';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  try {
    if (!accessToken || !accessToken.value) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const { data } = await api.get('/api/users/telegram-link', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

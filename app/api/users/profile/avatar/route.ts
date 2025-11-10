import { NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import { logErrorResponse } from '../../../_utils/utils';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.formData();

    const res = await api.patch('api/users/profile/avatar', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

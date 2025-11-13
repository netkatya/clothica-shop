import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data } = await api.post('/api/subscriptions', body);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

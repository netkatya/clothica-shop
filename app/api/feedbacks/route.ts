import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 3);
    const good = request.nextUrl.searchParams.get('good') ?? '';
    const category = request.nextUrl.searchParams.get('category') ?? '';
    const rate = request.nextUrl.searchParams.get('rate') ?? '';
    const res = await api('/api/feedbacks', {
      params: {
        page,
        perPage,
        ...(good && { good }),
        ...(category && { category }),
        ...(rate && { rate }),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data } = await api.post('/api/feedbacks', body);

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

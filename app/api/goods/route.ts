import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 12);
    const category = request.nextUrl.searchParams.get('category') ?? '';
    const gender = request.nextUrl.searchParams.get('gender') ?? '';
    const size = request.nextUrl.searchParams.get('size') ?? '';
    const minPrice = request.nextUrl.searchParams.get('minPrice') ?? '';
    const maxPrice = request.nextUrl.searchParams.get('maxPrice') ?? '';
    const res = await api('/api/goods', {
      params: {
        page,
        perPage,
        ...(gender && { gender }),
        ...(category && { category }),
        ...(size && { size: size.split(',') }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
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

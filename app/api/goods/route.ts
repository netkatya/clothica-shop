import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

import { isAxiosError } from 'axios';
import { serializeParams } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 12);
    const category = request.nextUrl.searchParams.get('category') ?? '';
    const gender = request.nextUrl.searchParams.get('gender') ?? '';
    const size = request.nextUrl.searchParams.get('size') ?? '';
    const good = request.nextUrl.searchParams.get('good') ?? '';
    const colors = request.nextUrl.searchParams.get('colors') ?? '';
    const minPrice = request.nextUrl.searchParams.get('minPrice') ?? '';
    const maxPrice = request.nextUrl.searchParams.get('maxPrice') ?? '';
    const sortBy = request.nextUrl.searchParams.get('sortBy') ?? '';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') ?? '';
    const res = await api('/api/goods', {
      params: {
        page,
        perPage,
        ...(gender && { gender }),
        ...(category && { category }),
        ...(size && { size: size.split(',') }),
        ...(good && { good: good.split(',') }),
        ...(colors && { color: colors.split(',') }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      },
      paramsSerializer: {
        serialize: serializeParams,
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

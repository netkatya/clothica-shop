import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../../api';

type Props = {
  params: Promise<{ orderNum: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { orderNum } = await params;
    const body = await request.json();
    const res = await api.patch(`/api/orders/${orderNum}/status`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

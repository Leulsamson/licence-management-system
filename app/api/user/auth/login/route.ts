import { NextRequest, NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userHash } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { userHash },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid user hash' },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await signJWT({
      id: user.id,
      username: user.username,
      type: 'user',
    });
    
    // Set cookie
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
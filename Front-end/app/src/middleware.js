import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const protectedRoutes = [
  '/registers/registerEmployed',
  '/registers/registerLots',
  '/registers/activities',
  '/dashboard'
];

async function middleware(request) {
  const cookie = request.cookies.get('token');

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (cookie === undefined) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    try {
      const { payload } = await jwtVerify(cookie["value"], new TextEncoder().encode('devlop-Secret-Key'));
      console.log('Payload:', payload);
      return NextResponse.next();
    } catch (error) {
      console.log('Error:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export default middleware;
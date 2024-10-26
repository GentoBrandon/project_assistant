import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const protectedRoutes = [
  '/registers/registerEmployed',
  '/registers/registerLots',
  '/registers/activities',
  '/registers/subActivities',
  '/Tables/viewEmployeds',
  '/Tables/viewLots',
  '/Tables/viewActivities',
  '/Tables/viewSubActivities',
  '/dashboard'
];

const dynamicRoutes = [
  /^\/edits\/editLot\/\d+$/, 
  /^\/edits\/editActivity\/\d+$/,
  /^\/edits\/editSubActivities\/\d+$/,
  /^\/edits\/editEmployed\/\d+$/
];

async function middleware(request) {
  const cookie = request.cookies.get('token');
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(pathname) || dynamicRoutes.some((pattern) => pattern.test(pathname));

  if (isProtectedRoute) {
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
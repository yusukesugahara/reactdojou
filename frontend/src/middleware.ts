import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // 環境変数からメンテナンスモードの状態を取得
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    // メンテナンスページ自体やAPIリクエスト、静的ファイルへのリクエストは除外
    const isMaintenancePath = request.nextUrl.pathname.startsWith('/maintenance');
    const isApiPath = request.nextUrl.pathname.startsWith('/api');
    const isStaticFile = /\.(jpg|jpeg|png|gif|svg|css|js)$/.test(request.nextUrl.pathname);
    
    if (!isMaintenancePath && !isApiPath && !isStaticFile) {
      const url = new URL(request.nextUrl.toString());
      url.pathname = '/maintenance';
      return NextResponse.redirect(url.toString(), 302);
    }
  }

  // 他のミドルウェア処理
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: [
    /*
     * 次のパスを除外:
     * - /_next (Next.jsの内部ファイル)
     * - /static (静的ファイル)
     */
    '/((?!_next|static).*)',
  ],
};
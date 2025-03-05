import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export function middleware(request: NextRequest) {
  // 環境変数からメンテナンスモードの状態を取得
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    // リクエストされたURLがメンテナンスページでない場合にリダイレクト
    if (!request.nextUrl.pathname.startsWith('/maintenance')) {
      return redirect('/maintenance');
    }
  }
}

// ミドルウェアを適用するパスを指定
export const config = {
  matcher: ['/:path*'], // すべてのパスに適用
};
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {
          // SSR 환경에서는 쿠키를 직접 설정하지 않음
        },
        remove: () => {
          // SSR 환경에서는 쿠키를 직접 제거하지 않음
        },
      },
    }
  );

  // 세션 처리
  await supabase.auth.exchangeCodeForSession(code);

  // 리디렉션
  return NextResponse.redirect(new URL("/dashboard", request.url));
}

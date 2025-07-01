import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login"); // 로그인 안 되어 있으면 /login
  } else {
    redirect("/dashboard"); // 로그인 되어 있으면 /dashboard
  }
}

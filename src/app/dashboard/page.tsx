"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 600px;
  margin: 80px auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background: #ef4444;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
      } else {
        setUserEmail(data.user.email ?? null);
        setLoading(false);
      }
    };

    getUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <Container>
      <Header>
        <h2>BudgetMate 대시보드</h2>
        <Button onClick={handleLogout}>로그아웃</Button>
      </Header>

      <p>
        👋 안녕하세요, <strong>{userEmail}</strong> 님!
      </p>

      {/* 여기에 수입/지출 기록, 차트 등 추가 예정 */}
    </Container>
  );
}

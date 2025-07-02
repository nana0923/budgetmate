"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import ExpenseList from "@/components/ExpenseList";

import ExpenseModalForm from "@/components/ExpenseModalForm";
import ExpenseChartTabs from "@/components/ExpenseChartTabs";

const Container = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 30px auto;
  padding: 1rem;
  @media (max-width: 1400px) {
    max-width: 800px;
    margin: 30px auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  gap: 1rem;
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

const AddButton = styled(Button)`
  width: 100px;
  background: #f1a924;
  &:hover {
    background: #cf9221;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

const AddBox = styled.div`
  display: flex;
  justify-content: end;
  padding: 0.8rem;
`;

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);

  // ✅ 지출 불러오기 함수
  const fetchExpenses = async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (data) {
      setExpenses(data);
    }
  };

  // ✅ 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
      } else {
        setUserEmail(data.user.email ?? null);
        setUserId(data.user.id ?? null);
        setLoading(false);
      }
    };

    getUser();
  }, [router, supabase]);

  // ✅ userId가 설정되면 지출 불러오기
  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <Container>
      <Header>
        <p>
          👋 안녕하세요, <strong>{userEmail}</strong> 님!
        </p>{" "}
        <Button onClick={handleLogout}>로그아웃</Button>
      </Header>
      {showForm && userId && (
        <ExpenseModalForm
          userId={userId}
          onClose={() => setShowForm(false)}
          onSaved={async () => {
            await fetchExpenses(); // ✅ fetch 완료 후에 모달 닫음
            setShowForm(false);
          }}
        />
      )}

      <Section>
        {userId && <ExpenseChartTabs expenses={expenses} userId={userId} />}
        <div>
          <AddBox>
            <AddButton onClick={() => setShowForm(true)}>지출 추가</AddButton>
          </AddBox>
          {userId && (
            <ExpenseList
              userId={userId}
              expenses={expenses}
              onUpdateExpenses={setExpenses}
            />
          )}
        </div>
      </Section>
    </Container>
  );
}

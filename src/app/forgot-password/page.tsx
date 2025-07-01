"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { createBrowserClient } from "@supabase/ssr";

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #0070f3;
  color: white;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #005ac1;
  }
`;
const ErrorMsg = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`, // 링크 클릭 시 이동할 페이지
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <Container>
      <h2>비밀번호 재설정</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {sent ? (
        <p>비밀번호 재설정 메일이 전송되었습니다.</p>
      ) : (
        <form onSubmit={handleReset}>
          <Input
            type="email"
            placeholder="이메일 주소 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">메일 보내기</Button>
        </form>
      )}
    </Container>
  );
}

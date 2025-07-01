"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function getKoreanAuthErrorMessage(message: string): string {
    if (message.includes("Invalid login credentials")) {
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    }

    if (message.includes("User not found")) {
      return "존재하지 않는 사용자입니다.";
    }

    if (message.includes("Email not confirmed")) {
      return "이메일 인증이 완료되지 않았습니다.";
    }

    return "로그인 중 오류가 발생했습니다. 다시 시도해주세요.";
  }

  const handleLogin = async () => {
    setError("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(getKoreanAuthErrorMessage(error.message));
    } else {
      router.push("/"); // 로그인 성공 후 홈으로 이동
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container>
      <h2>로그인</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button onClick={handleLogin}>로그인</Button>
      <h4 style={{ textAlign: "center" }}>
        <Link href={"/forgot-password"} style={{ color: "#00418b" }}>
          비밀번호찾기
        </Link>
      </h4>
    </Container>
  );
}

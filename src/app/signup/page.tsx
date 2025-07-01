"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
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
  background: #10b981;
  color: white;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #059669;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const SuccessMsg = styled.p`
  color: green;
  margin-bottom: 1rem;
`;

// 에러 메시지 한국어로 변환
function getSignupErrorMessage(message: string): string {
  if (message.includes("User already registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (message.includes("Password should be at least")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  return "회원가입 중 오류가 발생했습니다.";
}

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      setError(getSignupErrorMessage(error.message));
    } else {
      setSuccess("회원가입이 완료되었습니다! 이메일 인증 후 로그인해주세요.");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <Container>
      <h2>회원가입</h2>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>{success}</SuccessMsg>}
      <Input
        type="email"
        placeholder="이메일 주소"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Input
        type="password"
        placeholder="비밀번호 (6자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button onClick={handleSignup}>회원가입</Button>
    </Container>
  );
}

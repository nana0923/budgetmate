"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { createClient } from "@/lib/supabase";

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

type Props = {
  userId: string;
  onSaved: () => void;
};

export default function ExpenseForm({ userId, onSaved }: Props) {
  const superbase = createClient();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("식비");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await superbase.from("expenses").insert([
      {
        user_id: userId,
        amount: Number(amount),
        category,
        memo,
        date,
      },
    ]);

    if (error) {
      alert("저장 실패:" + error.message);
    } else {
      alert("저장 완료!");
      setAmount("");
      setMemo("");
      onSaved(); // ✅ 리스트/차트 새로고침 & 모달 닫기
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="식비">식비</option>
        <option value="교통">교통</option>
        <option value="문화">문화</option>
        <option value="쇼핑">쇼핑</option>
        <option value="기타">기타</option>
      </Select>
      <Input
        type="text"
        placeholder="메모"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button type="submit">저장</Button>
    </Form>
  );
}

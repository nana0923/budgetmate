"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import styled from "@emotion/styled";
import { Expense } from "@/type";

const ListContainer = styled.div`
  min-width: 600px;
  @media (max-width: 1400px) {
    min-width: 100%;
  }
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
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

const DelButton = styled(Button)`
  background: #ef4444;
  margin-left: 10px;
  &:hover {
    background: #dc2626;
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

type ExpenseListProps = {
  userId: string;
  expenses: Expense[];
  onUpdateExpenses: (newExpenses: Expense[]) => void;
};

export default function ExpenseList({
  expenses,
  onUpdateExpenses,
}: ExpenseListProps) {
  const supabase = createClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    amount: string;
    memo: string;
  }>({ amount: "", memo: "" });

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (!error) {
      onUpdateExpenses(expenses.filter((item) => item.id !== id));
    } else {
      alert("삭제 실패: " + error.message);
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from("expenses")
      .update({
        amount: parseInt(editValues.amount),
        memo: editValues.memo,
      })
      .eq("id", id);

    if (!error) {
      onUpdateExpenses(
        expenses.map((item) =>
          item.id === id
            ? {
                ...item,
                amount: parseInt(editValues.amount),
                memo: editValues.memo,
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      alert("수정 실패: " + error.message);
    }
  };

  // 수정 버튼 클릭 시 값 세팅
  const startEditing = (item: Expense) => {
    setEditingId(item.id);
    setEditValues({
      amount: item.amount.toString(),
      memo: item.memo,
    });
  };

  return (
    <ListContainer>
      <h3>📋 지출 목록</h3>
      {expenses.map((item) => (
        <ExpenseItem key={item.id}>
          {editingId === item.id ? (
            <>
              <div>
                <Input
                  type="number"
                  value={editValues.amount}
                  onChange={(e) =>
                    setEditValues({ ...editValues, amount: e.target.value })
                  }
                  style={{ width: "100px", marginRight: "8px" }}
                />
                <Input
                  type="text"
                  value={editValues.memo}
                  onChange={(e) =>
                    setEditValues({ ...editValues, memo: e.target.value })
                  }
                  style={{ width: "200px" }}
                />
              </div>
              <div>
                <Button onClick={() => handleUpdate(item.id)}>저장</Button>
                <DelButton onClick={() => setEditingId(null)}>취소</DelButton>
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>{item.date}</strong> - {item.category}{" "}
                {item.memo && `- ${item.memo}`}
              </div>
              <div>
                {item.amount.toLocaleString()}원
                <Button
                  onClick={() => startEditing(item)}
                  style={{ marginLeft: "8px" }}>
                  수정
                </Button>
                <DelButton onClick={() => handleDelete(item.id)}>
                  삭제
                </DelButton>
              </div>
            </>
          )}
        </ExpenseItem>
      ))}
    </ListContainer>
  );
}

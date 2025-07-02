"use client";

import styled from "@emotion/styled";
import ExpenseForm from "./ExpenseForm";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1.2rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

type Props = {
  userId: string;
  onClose: () => void;
  onSaved: () => void;
};

export default function ExpenseModalForm({ userId, onClose, onSaved }: Props) {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>✖</CloseBtn>
        <ExpenseForm userId={userId} onSaved={onSaved} />
      </ModalBox>
    </Overlay>
  );
}

"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import ExpensePieChart from "@/charts/ExpensePieChart";
import MonthlyBarChart from "@/charts/MonthlyBarChart";
import DailyLineChart from "@/charts/DailyLineChart";

const Container = styled.div``;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#5f5f5f" : "#e5e7eb")};
  color: ${(props) => (props.active ? "white" : "#374151")};
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#3d3d3d" : "#d1d5db")};
  }
`;

type ChartType = "pie" | "bar" | "line";
type Props = {
  expenses: any[]; // 또는 더 구체적으로 정의해도 좋음
  userId: string;
};

export default function ExpenseChartTabs({ expenses, userId }: Props) {
  const [activeTab, setActiveTab] = useState<ChartType>("pie");

  return (
    <Container>
      <h3>📊 지출 통계</h3>
      <Tabs>
        <TabButton
          active={activeTab === "pie"}
          onClick={() => setActiveTab("pie")}>
          카테고리 원형
        </TabButton>
        <TabButton
          active={activeTab === "bar"}
          onClick={() => setActiveTab("bar")}>
          월별 총 지출
        </TabButton>
        <TabButton
          active={activeTab === "line"}
          onClick={() => setActiveTab("line")}>
          일별 지출 변화
        </TabButton>
      </Tabs>

      {activeTab === "pie" && <ExpensePieChart expenses={expenses} />}
      {activeTab === "bar" && <MonthlyBarChart expenses={expenses} />}
      {activeTab === "line" && <DailyLineChart expenses={expenses} />}
    </Container>
  );
}

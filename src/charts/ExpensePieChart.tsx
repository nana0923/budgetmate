"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "@emotion/styled";

const Contanier = styled.div`
  width: 400px;
  margin: 2rem auto;
  @media (max-width: 500px) {
    width: 300px;
    margin: 2rem auto;
  }
`;

ChartJS.register(ArcElement, Tooltip, Legend);

type Expense = {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  memo: string;
  date: string;
};

type Props = {
  expenses: Expense[];
};

export default function ExpensePieChart({ expenses }: Props) {
  const categoryMap = expenses.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "카테고리별 지출",
        data: Object.values(categoryMap),
        backgroundColor: [
          "#60a5fa",
          "#f87171",
          "#34d399",
          "#facc15",
          "#a78bfa",
        ],
      },
    ],
  };

  return (
    <Contanier>
      <Pie data={data} />
    </Contanier>
  );
}

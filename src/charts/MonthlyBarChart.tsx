"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "@emotion/styled";

const Contanier = styled.div`
  width: 500px;
  margin: 2rem auto;
  @media (max-width: 500px) {
    width: 300px;
    margin: 2rem auto;
  }
`;

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

export default function MonthlyBarChart({ expenses }: Props) {
  // 월별 합계 계산
  const monthMap = expenses.reduce<Record<string, number>>((acc, curr) => {
    const month = curr.date.slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + curr.amount;
    return acc;
  }, {});

  const sortedMonths = Object.keys(monthMap).sort();

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: "월별 지출 총액",
        data: sortedMonths.map((month) => monthMap[month]),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <Contanier>
      <Bar data={data} />
    </Contanier>
  );
}

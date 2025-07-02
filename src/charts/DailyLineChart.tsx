"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
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

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

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

export default function DailyLineChart({ expenses }: Props) {
  const dailyMap = expenses.reduce<Record<string, number>>((acc, curr) => {
    const day = curr.date;
    acc[day] = (acc[day] || 0) + curr.amount;
    return acc;
  }, {});

  const sortedDays = Object.keys(dailyMap).sort();

  const data = {
    labels: sortedDays,
    datasets: [
      {
        label: "일별 지출",
        data: sortedDays.map((day) => dailyMap[day]),
        fill: false,
        borderColor: "#10b981",
        tension: 0.2,
      },
    ],
  };

  return (
    <Contanier>
      <Line data={data} />
    </Contanier>
  );
}

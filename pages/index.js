import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [age, setAge] = useState(30);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [assets, setAssets] = useState(5000000);
  const [income, setIncome] = useState(300000);
  const [expenses, setExpenses] = useState(250000);
  const [rate, setRate] = useState(3);

  const remainingYears = lifeExpectancy - age;
  const remainingDays = remainingYears * 365;

  // 資産シミュレーション
  let data = [];
  let currentAssets = assets;
  for (let year = 0; year <= remainingYears; year++) {
    currentAssets += (income - expenses) * 12;
    currentAssets *= 1 + rate / 100;
    data.push({ year: age + year, assets: Math.max(currentAssets, 0) });
  }

  const dailyBudget = Math.floor(currentAssets / remainingDays);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Life Countdown ＋ 資産シミュレーション
      </h1>

      {/* 入力フォーム */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-2xl shadow-md">
        <label>
          年齢:{" "}
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          想定寿命:{" "}
          <input
            type="number"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          現在資産(円):{" "}
          <input
            type="number"
            value={assets}
            onChange={(e) => setAssets(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          月収(円):{" "}
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          月支出(円):{" "}
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
        <label>
          年利(%):{" "}
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="border p-1 ml-2"
          />
        </label>
      </div>

      {/* カウントダウン */}
      <div className="mb-6 text-center">
        <p className="text-2xl font-semibold">
          残り日数: {remainingDays.toLocaleString()} 日
        </p>
        <p className="text-lg text-gray-600">
          1日あたり自由に使えるお金: {dailyBudget.toLocaleString()} 円
        </p>
      </div>

      {/* 資産推移グラフ */}
      <div className="w-full h-80 bg-white p-4 rounded-2xl shadow-md">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line type="monotone" dataKey="assets" stroke="#2563eb" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
import { useLoading } from "./LoadingContext";

const GraphPage = () => {
  const { setIsLoading } = useLoading();
  const [chartData, setChartData] = useState<any>(null);
  const [selectedKey, setSelectedKey] = useState("status");
  const chartRef = useRef<HTMLDivElement>(null);

  const fetchChartData = async (chartKey: string) => {
    try {
      const userData = localStorage.getItem("user");
      const token = userData ? JSON.parse(userData).token : null;
      setIsLoading(true);
      const res = await axios.post("https://taskmanagement-4l0e.onrender.com/api/tasks/chart", {
        chartKey,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      const chartData = res.data.chartData ? res.data.chartData : {};
      setChartData(chartData);
    } catch (err) {
      console.error("Failed to fetch chart data", err);
    }
  };

  useEffect(() => {
    fetchChartData(selectedKey);
  }, [selectedKey]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(chartData);
      return () => chart.dispose();
    }
  }, [chartData]);

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Group By:
        </label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="createdBy">Created By</option>
        </select>
      </div>

      <div
        ref={chartRef}
        style={{ width: "100%", height: "400px", backgroundColor: "#fff" }}
      ></div>
    </div>
  );
};

export default GraphPage;

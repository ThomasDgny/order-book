import useRealTimeChart from "../../../hooks/useRealTimeChart";

export default function ChartComponent({
  coin,
  time,
}: {
  coin: string;
  time: string;
}) {
  useRealTimeChart(coin, time);
  return (
    <div
      id="chart-container"
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    ></div>
  );
}

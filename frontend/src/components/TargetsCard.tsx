import { Card } from "flowbite-react";
import LineChart from "../assets/LineChart.png";

interface Target {
    metricName: string,
    metricStat: number,
    status: string,
    targetStat: number,
    change: number
}
const TargetsCard: React.FC<Target> = ({ metricName, metricStat, status, targetStat, change }) => {
    
  return (
    <Card className={`w-1/3 p-0 m-3 ${status} flex items-center`} horizontal>
      <div>
        <h3 className="text-center text-4xl font-bold tracking-tight text-gray-900 text-white">
          {metricStat} <span className="text-xl">( {change}% &uarr;)</span>
        </h3>
        <h3 className="p-3 text-center text-xl tracking-tight text-gray-900 text-white">
          {metricName}
        </h3>
        <img src={LineChart} />
      </div>
    </Card>
  );
};

export default TargetsCard;

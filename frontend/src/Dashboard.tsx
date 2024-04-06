import AdminHeader from "./components/AdminHeader";
import TargetsCard from "./components/TargetsCard";
import FrequencyDropdown from "./components/FrequencyDropdown";
import { Card, Checkbox, Label } from "flowbite-react";
import MetricsSummaryTable from "./components/MetricsSummaryTable";

const targetData = [
  {
    metricName: "Carbon Emissions in Kt ",
    metricStat: 85,
    status: "bg-red-500",
    targetStat: 25,
    change: 5,
  },
  {
    metricName: "Energy Consumption in kWh",
    metricStat: 100,
    status: "bg-yellow-400",
    targetStat: 75,
    change: 2,
  },
  {
    metricName: "Water Usage in Metric Tons",
    metricStat: 18,
    status: "bg-green-400",
    targetStat: 12,
    change: 0.2,
  },
];

function Dashboard() {
  return (
    <>
      <div>
        <AdminHeader title="Admin Dashboard" />
        <div className="m-5">
          <div className="flex justify-between">
            <h3 className="m-3 mb-4 text-l font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">
              Targets Overview
            </h3>
            <FrequencyDropdown></FrequencyDropdown>
          </div>
          <div className="flex justify-around">
            {targetData?.map((target) => {
              return (
                <TargetsCard
                  key={target.metricName}
                  metricName={target.metricName}
                  metricStat={target.metricStat}
                  status={target.status}
                  targetStat={target.targetStat}
                  change={target.change}
                />
              );
            })}
          </div>
        </div>
        <div className="m-5 flex justify-around">
          <Card className="w-1/2 m-3">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Admin Tasks Remaining
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <Checkbox color="purple" />
              <Label htmlFor="remember"> &emsp; Fill in Company Profile</Label>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <Checkbox color="purple" />
              <Label htmlFor="remember">
                {" "}
                &emsp; Select relevant ESG metrics{" "}
              </Label>
            </p>
          </Card>
          <Card className="w-1/2 m-3">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Get Personalised Reccomendation
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <Checkbox color="purple" />
              <Label htmlFor="remember">
                {" "}
                &emsp; Set targets for each metric
              </Label>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <Checkbox color="purple" />
              <Label htmlFor="remember">
                {" "}
                &emsp; Disseminate to relevant departments{" "}
              </Label>
            </p>
          </Card>
        </div>
        <div className="m-5">
          <Card className="w-full">
            <MetricsSummaryTable />
          </Card>
        </div>
      </div>
    </>
  );
}
export default Dashboard;

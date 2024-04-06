import React from "react";
import { Checkbox } from "flowbite-react";
import { Metric } from "../Data";

interface DataSideBarProps {
  onToggleSidebar: () => void;
  selectedMetrics: string[];
  metrics: Metric[];
  isExpanded: boolean;
}

const DataSideBar: React.FC<DataSideBarProps> = ({
  onToggleSidebar,
  selectedMetrics,
  isExpanded,
  metrics,
}) => {
  console.log(metrics);

  return (
    <div
      className={`transition-all duration-300 ${
        isExpanded ? "w-64" : "w-0"
      } h-full overflow-hidden bg-white shadow-md`}
    >
      <div className="flex flex-col h-screen">
        <div className="px-4 py-2">
          <div className="flex flex-col mt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Select to Visualise
            </h2>
            {metrics &&
              metrics.length > 0 &&
              metrics.map((metric) => (
                <div key={metric.name} className="flex">
                  <Checkbox className="mt-1 mr-1"></Checkbox>
                  <p
                    className={
                      selectedMetrics.includes(metric.name) ? "selected" : ""
                    }
                  >
                    {metric.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <button
          className={`absolute top-0 right-full transform ${
            isExpanded ? "-translate-x-full" : "translate-x-0"
          } px-2 py-1 bg-blue-600 text-white`}
          onClick={onToggleSidebar}
        >
          {isExpanded ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default DataSideBar;

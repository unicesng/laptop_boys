import React from "react";
import { Checkbox } from "flowbite-react";

interface DataSideBarProps {
  onToggleSidebar: () => void;
  selectedMetrics: string[];
  isExpanded: boolean;
}

const DataSideBar: React.FC<DataSideBarProps> = ({
  onToggleSidebar,
  selectedMetrics,
  isExpanded,
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isExpanded ? "w-64" : "w-0"
      } h-full overflow-hidden bg-white shadow-md`}
    >
      <div className="flex flex-col h-screen">
        <div className="px-4 py-2">
          <h2 className="text-lg mt-3 font-semibold text-gray-700">
            Currently Visualising
          </h2>
          <p>
            2. Environmental Impacts in the Supply Chain
          </p>
          <hr className="my-2"/>
          <div className={selectedMetrics.includes("2.1") ? "selected" : ""}>
            Metric 2.1
          </div>
          <div className={selectedMetrics.includes("2.2") ? "selected" : ""}>
            Metric 2.2
          </div>
          <div className="flex flex-col mt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Select to Visualise
            </h2>
            <div className="flex">
              <Checkbox className="mt-1 mr-1"></Checkbox>
              <p
                className={selectedMetrics.includes("2.1") ? "selected" : ""}
              >
                Management of Chemicals in Products
              </p>
            </div>
            <div className="flex">
              <Checkbox className="mt-1 mr-1"></Checkbox>
              <p
                className={selectedMetrics.includes("2.2") ? "selected" : ""}
              >
                Labour Conditions in the Supply Chain
              </p>
            </div>
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

// import './DataVisualizationApp.css'; // Assuming you have a corresponding CSS file for styles
import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import DataSideBar from "./components/DataSideBar";
import AdminHeader from "./components/AdminHeader";
import DataGraph from "./components/DataGraph";

interface Recommendation {
  category: string;
  description: string;
}

interface Recommendations {
  company: string;
  overall: string;
  recommend: {
    [key: string]: Recommendation;
  };
  standard: string;
}

const Data: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendations>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const getRecommendations = () => {
    setIsLoading(true);
    try {
      axios.post("http://127.0.0.1:5000/recommend", {}).then((response) => {
        console.log(response.data);
        setRecommendations(response.data);
        setIsLoading(false);
      });
    } catch {
      console.log("Error");
    }
  };

  const title = "Environmental Impacts in the Supply Chain";
  const description =
    "Metric 2.1: Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 in comp";
  const topic = "Management of Chemicals in Products ";

  return (
    <div className="w-full items-center flex flex-col ">
      <AdminHeader title="Data Visualisation"></AdminHeader>
      <div className="w-full flex flex-row">
        <DataSideBar
          isExpanded={isExpanded}
          onToggleSidebar={onToggleSidebar}
          selectedMetrics={[]}
        />
        <div className="flex flex-col items-center justify-center mx-auto text-left">
          <h1 className="text-2xl">{title}</h1>
          <h2 className="text-2xl">{description}</h2>
          <div className="w-full flex">
            <DataGraph></DataGraph>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-10">
        <Button onClick={() => getRecommendations()} color="purple">
          Get Recommendations
        </Button>
        <Button color="purple">Get Feedback</Button>
      </div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : recommendations ? (
        <div className="w-4/5 mb-10">
          <p className="text-lg font-semibold text-center mb-3">
            Recommendations
          </p>
          <p className="text-justify whitespace-pre-line">
            {recommendations.overall}
            <br />
            {Object.keys(recommendations.recommend).map((key) => {
              return (
                <div key={key}>
                  <p className="mt-2">
                    <span className="font-semibold mt-3">
                      {recommendations.recommend[key].category}
                    </span>
                    :&nbsp;{recommendations.recommend[key].description}
                  </p>
                </div>
              );
            })}
          </p>
        </div>
      ) : null}
    </div>
  );
};

// {/* <div>
// <header className="header">
//     <h2>Environmental Impacts in the Supply Chain</h2>
//     <p>
//         Metric 2.1: Percentage of (1) Tier 1 supplier
//         facilities and (2) supplier facilities beyond Tier 1
//         in compliance with wastewater discharge permits or
//         contractual agreements
//     </p>
// </header>
// <section className="chart-section">
//     <h3>
//         Percentage of Supplier Facilities in compliance with
//         wastewater discharge permits
//     </h3>
//     {/* This button would likely trigger a modal or another component to update the period */}
//     <button>Update period</button>
//     <div className="chart-container">
//         {/* The chart would be rendered inside this div */}
//     </div>
//     {/* Additional UI elements for controlling the chart (e.g., time period selection) */}
//     <button>Past 3 Months</button>
// </section>
// </div> */}

// const SideBar: React.FC = () => {
//   // Add logic to handle selection of metrics and visualization options
//   return (
//     <aside className="sidebar p-4">
//       <div className="current-visualizing">
//         <h3 className="text-lg font-bold">Currently Visualising</h3>
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Management of Chemicals in Products
//         </label>
//         <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Select all
//         </button>
//       </div>
//       <div className="select-to-visualize mt-4">
//         <h3 className="text-lg font-bold">Select to Visualize</h3>
//         {/* These would be dynamic based on the data */}
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Management of Chemicals in Products
//         </label>
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" /> Labour Conditions in the Supply Chain
//         </label>
//         {/* Add additional options as necessary */}
//         <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Get Recommendations
//         </button>
//       </div>
//     </aside>
//   );
// };

export default Data;

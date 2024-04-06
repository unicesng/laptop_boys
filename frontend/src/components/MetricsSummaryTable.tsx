import { Table } from "flowbite-react";
import FrequencyDropdown from "./FrequencyDropdown";
import { useNavigate } from "react-router-dom";

const data = [
  {
    topic: "1. Management of Chemicals in Products",
    metric:
      "Metric 1.1 Discussion of processes to maintain compliance with restricted substances regulations",
    type: "Qualitative",
    assigneeName: "Username",
    photolink: "",
  },
  {
    topic: "1. Management of Chemicals in Products",
    metric:
      "Metric 1.2 Discussion of processes to assess and manage risks or hazards associated with chemicals in products",
    type: "Qualitative",
    assigneeName: "Username",
    photolink: "",
  },
  {
    topic: "2. Environmental Impacts in the Supply Chain",
    metric:
      "Metric 2.1 Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 in compliance with wastewater discharge permits or contractual agreements",
    type: "Percentage (%)",
    assigneeName: "Username",
    photolink: "",
  },
  {
    topic: "2. Environmental Impacts in the Supply Chain",
    metric:
      "Metric 2.2 Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 that have completed the Sustainable Apparel Coalition’s Higg Facility Environmental Module (Higg FEM) assessment or an equivalent environmental data assessment",
    type: "Percentage (%)",
    assigneeName: "Username",
    photolink: "",
  },
  {
    topic: "3. Labour Conditions in the Supply Chain",
    metric:
      "Metric 3.1 Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 that have been audited to a labour code of conduct, (3) percentage of total audits conducted by a third-party auditor",
    type: "Percentage (%)",
    assigneeName: "Username",
    photolink: "",
  },
];

const MetricsSummaryTable = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Metrics Summary
                </h5>
                <button
                    onClick={() => navigate("/metric")}
                    type="button"
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                    Details
                </button>
            </div>
            <div>
                <p>
                    SASB Apparel, Accessories, & Footwear &emsp;
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                        INDUSTRY STANDARD | VERSION 2023-12
                    </span>
                </p>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Topic</Table.HeadCell>
                    <Table.HeadCell>Metric</Table.HeadCell>
                    <Table.HeadCell>Metric Type</Table.HeadCell>
                    <Table.HeadCell>Assigned To</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {data?.map((row, ind) => {
                        return (
                          <Table.Row>
                            <Table.Cell key={ind} className="max-w-80">
                              {row.topic}
                            </Table.Cell>
                            <Table.Cell>{row.metric}</Table.Cell>
                            <Table.Cell>{row.type}</Table.Cell>
                            <Table.Cell className="flex items-center">
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="user photo"
                              /> &nbsp;
                              <span>{row.assigneeName}</span>
                            </Table.Cell>
                          </Table.Row>
                        );
                    })}


                </Table.Body>
            </Table>
        </div>
    );
};

export default MetricsSummaryTable;

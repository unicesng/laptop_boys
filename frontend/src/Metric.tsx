import { Button, Modal } from "flowbite-react";
import AdminHeader from "./components/AdminHeader";
import MetricsTable from "./components/MetricsTable";
import AssignDepartmentModal from "./components/AssignDepartmentModal";

interface MetricProps {
    topic: string;
    title: string;
    description: string;
}

const Metric: React.FC<MetricProps> = ({ topic, title, description }) => {

    title = "Metric 2.2"
    description = "Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 in compliance with wastewater discharge permits or contractual agreements"
    topic = "Management of Chemicals in Products "
    return (
        <div className="flex flex-col px-4">
            <AdminHeader title="Company Metrics"></AdminHeader>
            <div className="flex flex-col items-center justify-center mx-auto text-left">
                <h1 className="text-2xl">
                    {title}
                </h1>
                <h2 className="text-2xl">
                    {description}
                </h2>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl">
                            In topic: {topic}
                        </h3>
                        <AssignDepartmentModal></AssignDepartmentModal>
                    </div>
                </div>

            </div>

            <MetricsTable></MetricsTable>

        </div>
    )
}

export default Metric
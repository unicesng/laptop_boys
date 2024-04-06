import { Select } from "flowbite-react";

const FrequencyDropdown: React.FC = () => {

    return (
        <Select required className="min-w-2">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
        </Select>
    );
};

export default FrequencyDropdown;

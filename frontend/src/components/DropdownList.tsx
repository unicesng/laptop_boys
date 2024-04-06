import { Dropdown, DropdownItem } from "flowbite-react";

interface DropdownListProps {
  items: string[];
}

const DropdownList: React.FC<DropdownListProps> = ({ items }) => {
  return (
    <Dropdown label="Date range" inline>
      {items?.map((item) => {
        return <DropdownItem key={item}>{item}</DropdownItem>;
      })}
    </Dropdown>
  );
};

export default DropdownList;
import { Table } from 'flowbite-react';
import FrequencyDropdown from './FrequencyDropdown';
import EditMetricModal from './EditMetricModal';

const data = [
  {
    field:
      "Percentage of Supplier Facilities in compliance with wastewater discharge permits",
    description:
      "Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)",
    dataFormat: "Numeric",
  },
  {
    field:
      "Percentage of Supplier Facilities in compliance with wastewater discharge permits",
    description:
      "Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)",
    dataFormat: "Numeric",
  },
  {
    field:
      "Percentage of Supplier Facilities in compliance with wastewater discharge permits",
    description:
      "Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)",
    dataFormat: "Numeric",
  },
  {
    field:
      "Percentage of Supplier Facilities in compliance with wastewater discharge permits",
    description:
      "Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)",
    dataFormat: "Numeric",
  },
];

const MetricsTable = () => {
    return (
      <div>
        <div className="flex justify-between">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Metrics Summary
          </h5>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Field</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Data Format</Table.HeadCell>
            <Table.HeadCell>Frequency</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data?.map((row, ind) => {
              return (
                <Table.Row key={ind}>
                  <Table.Cell className="max-w-80">{row.field}</Table.Cell>
                  <Table.Cell>{row.description}</Table.Cell>
                  <Table.Cell>{row.dataFormat}</Table.Cell>
                  <Table.Cell className="min-w-20">
                    <FrequencyDropdown></FrequencyDropdown>
                  </Table.Cell>
                  <Table.Cell>
                    <EditMetricModal />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
}

export default MetricsTable


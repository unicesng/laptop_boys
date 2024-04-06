import { Table } from 'flowbite-react'
import FrequencyDropdown from './FrequencyDropdown'

const MetricsTable = () => {
    return (
        <div><div className="text-2xl mb-5 font-semibold">Company Metrics</div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        Field
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Description
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Data Format
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Frequency
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell className="max-w-80">
                            Percentage of Supplier Facilities in compliance with wastewater discharge permits
                        </Table.Cell>
                        <Table.Cell>
                            Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)
                        </Table.Cell>
                        <Table.Cell>
                            Numeric
                        </Table.Cell>
                        <Table.Cell className="min-w-20">
                            <FrequencyDropdown></FrequencyDropdown>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="max-w-80">
                            Percentage of Supplier Facilities in compliance with wastewater discharge permits
                        </Table.Cell>
                        <Table.Cell>
                            Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)
                        </Table.Cell>
                        <Table.Cell>
                            Numeric
                        </Table.Cell>
                        <Table.Cell className="min-w-20">
                            <FrequencyDropdown></FrequencyDropdown>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="max-w-80">
                            Percentage of Supplier Facilities in compliance with wastewater discharge permits
                        </Table.Cell>
                        <Table.Cell>
                            Calculate the percentages by dividing the number of supplier facilities (in each respective category) in compliance with wastewater discharge permits or contractual agreements by the total number of supplier facilities (in each respective category)
                        </Table.Cell>
                        <Table.Cell>
                            Numeric
                        </Table.Cell>
                        <Table.Cell className="min-w-20">
                            <FrequencyDropdown></FrequencyDropdown>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table></div>
    )
}

export default MetricsTable


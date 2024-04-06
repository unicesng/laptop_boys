import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Select,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";

const Profile = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedStandards, setSelectedStandards] = useState([]);
  const navigate = useNavigate();

  let messageDisplayed = false;

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedStandards.includes(value)) {
      setSelectedStandards(
        selectedStandards.filter((standard) => standard !== value)
      );
    } else {
      setSelectedStandards([...selectedStandards, value]);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const industryMap: { [key: string]: { [key: string]: string[] } } = {
    "CONSUMER GOODS": {
      "Apparel, Accessories & Footwear": ["GRI", "CDP", "SASB"],
      "Appliance Manufacturing": ["SASB", "GRI"],
      "Building Products & Furnishings": ["CDP", "GRI", "SASB"],
      "E-Commerce": ["GRI", "CDP"],
      "Household & Personal Products": ["SASB", "GRI"],
      "Multiline and Specialty Retailers & Distributors": ["CDP", "GRI"],
      "Toys & Sporting Goods": ["GRI", "SASB"],
    },
    "EXTRACTIVES & MINERALS PROCESSING": {
      "Coal Operations": ["SASB", "GRI"],
      "Construction Materials": ["GRI", "CDP"],
      "Iron & Steel Producers": ["SASB", "GRI", "CDP"],
      "Metals & Mining": ["CDP", "SASB"],
      "Oil & Gas - Exploration & Production": ["GRI", "SASB"],
      "Oil & Gas - Midstream": ["CDP", "GRI"],
      "Oil & Gas - Refining & Marketing": ["SASB", "GRI"],
      "Oil & Gas - Services": ["GRI", "CDP"],
    },
    FINANCIALS: {
      "Asset Management & Custody Activities": ["GRI", "SASB"],
      "Commercial Banks": ["SASB", "CDP"],
      "Consumer Finance": ["GRI", "SASB"],
      Insurance: ["CDP", "GRI"],
      "Investment Banking & Brokerage": ["SASB", "GRI"],
      "Mortgage Finance": ["GRI", "CDP"],
      "Security & Commodity Exchanges": ["SASB", "CDP"],
    },
    "FOOD & BEVERAGE": {
      "Agricultural Products": ["SASB", "GRI"],
      "Alcoholic Beverages": ["GRI", "CDP"],
      "Food Retailers & Distributors": ["SASB", "GRI", "CDP"],
      "Meat, Poultry & Dairy": ["GRI", "CDP"],
      "Non-Alcoholic Beverages": ["SASB", "GRI"],
      "Processed Foods": ["CDP", "GRI"],
      Restaurants: ["GRI", "SASB"],
      Tobacco: ["CDP", "GRI"],
    },
    "HEALTH CARE": {
      "Biotechnology & Pharmaceuticals": ["SASB", "GRI"],
      "Drug Retailers": ["GRI", "CDP"],
      "Health Care Delivery": ["SASB", "GRI"],
      "Health Care Distributors": ["CDP", "GRI"],
      "Managed Care": ["SASB", "CDP"],
      "Medical Equipment & Supplies": ["GRI", "SASB"],
    },
    INFRASTRUCTURE: {
      "Electric Utilities & Power Generators": ["CDP", "GRI"],
      "Engineering & Construction Services": ["SASB", "GRI"],
      "Gas Utilities & Distributors": ["GRI", "CDP"],
      "Home Builders": ["SASB", "GRI"],
      "Real Estate": ["GRI", "CDP"],
      "Real Estate Services": ["SASB", "GRI"],
      "Waste Management": ["GRI", "CDP"],
      "Water Utilities & Services": ["SASB", "GRI"],
    },
    "RENEWABLE RESOURCES & ALTERNATIVE ENERGY": {
      Biofuels: ["GRI", "CDP"],
      "Forestry Management": ["SASB", "GRI"],
      "Fuel Cells & Industrial Batteries": ["GRI", "CDP"],
      "Pulp & Paper Products": ["SASB", "GRI"],
      "Solar Technology & Project Developers": ["GRI", "CDP"],
      "Wind Technology & Project Developers": ["SASB", "GRI"],
    },
    "RESOURCE TRANSFORMATION": {
      "Aerospace & Defense": ["SASB", "GRI"],
      Chemicals: ["GRI", "CDP"],
      "Containers & Packaging": ["SASB", "GRI"],
      "Electrical & Electronic Equipment": ["GRI", "CDP"],
      "Industrial Machinery & Goods": ["SASB", "GRI"],
    },
    SERVICES: {
      "Advertising & Marketing": ["GRI", "SASB"],
      "Casinos & Gaming": ["SASB", "CDP"],
      Education: ["GRI", "CDP"],
      "Hotels & Lodging": ["SASB", "GRI"],
      "Leisure Facilities": ["GRI", "CDP"],
      "Media & Entertainment": ["SASB", "GRI"],
      "Professional & Commercial Services": ["GRI", "CDP"],
    },
    "TECHNOLOGY & COMMUNICATIONS": {
      "Electronic Manufacturing Services & Original Design Manufacturing": [
        "GRI",
        "CDP",
      ],
      Hardware: ["SASB", "GRI"],
      "Internet Media & Services": ["GRI", "CDP"],
      Semiconductors: ["SASB", "GRI"],
      "Software & IT Services": ["GRI", "CDP"],
      "Telecommunication Services": ["SASB", "GRI"],
    },
    TRANSPORTATION: {
      "Air Freight & Logistics": ["SASB", "GRI"],
      Airlines: ["GRI", "CDP"],
      "Auto Parts": ["SASB", "GRI"],
      Automobiles: ["GRI", "CDP"],
      "Car Rental & Leasing": ["SASB", "GRI"],
      "Cruise Lines": ["GRI", "CDP"],
      "Marine Transportation": ["SASB", "GRI"],
      "Rail Transportation": ["GRI", "CDP"],
      "Road Transportation": ["SASB", "GRI"],
    },
  };

  const standardMap = {
    GRI: "Global Reporting Initiative",
    CDP: "Carbon Disclosure Project",
    SASB: "Sustainability Accounting Standards Board",
  };

  return (
    <>
      <div className="w-full m-10 h-screen">
        <div className="w-full bg-gray-100 shadow-md rounded-md p-8">
          <div className="text-2xl font-semibold">
            Welcome to ESG Application!
          </div>
          <div className="mb-5">
            Please fill in the information below to get started
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event?.preventDefault();
              navigate("/dashboard");
            }}
          >
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile1"
                  value="Company Name"
                />
              </div>
              <TextInput
                id="profile1"
                name="profile1"
                type="text"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile2"
                  value="Company Email"
                />
              </div>
              <TextInput
                id="profile2"
                name="profile2"
                type="email"
                placeholder="Company Email"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile3"
                  value="Company Location"
                />
              </div>
              <TextInput
                id="profile3"
                name="profile3"
                type="text"
                placeholder="Company Location"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile4"
                  value="Number of Employees"
                />
              </div>
              <TextInput
                id="profile4"
                name="profile4"
                type="number"
                placeholder="Number of Employees"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile5"
                  value="Company Revenue ($)"
                />
              </div>
              <TextInput
                id="profile5"
                name="profile5"
                type="number"
                placeholder="Company Revenue"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile6"
                  value="Company Description"
                />
              </div>
              <Textarea
                id="profile6"
                name="profile6"
                type="text"
                placeholder="Company Description"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  className="font-semibold"
                  htmlFor="profile7"
                  value="Industry"
                />
              </div>
              <Select
                id="profile7"
                onChange={handleChange}
                value={selectedValue}
                required
              >
                {Object.keys(industryMap).map((industry) => (
                  <optgroup label={industry} key={industry}>
                    {Object.keys(industryMap[industry]).map((subIndustry) => (
                      <option value={subIndustry} key={subIndustry}>
                        {subIndustry}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
              <p className="text-sm pl-1 pt-1 text-gray-500">
                If you are unsure, you may visit{" "}
                <a
                  className="hover:text-blue-500 hover:underline"
                  href="https://sasb.ifrs.org/find-your-industry/"
                  target="_blank"
                >
                  SASB
                </a>{" "}
                to check
              </p>
            </div>

            <div>
              <div className="block">
                <Label
                  className="font-semibold"
                  htmlFor="profile8"
                  value="Available Standards"
                />
              </div>
              {Object.keys(industryMap).map((industry) =>
                selectedValue
                  ? industryMap[industry][selectedValue] && (
                      <div key={industry} className="mt-2">
                        {industryMap[industry][selectedValue].map(
                          (standard) => (
                            <div
                              key={standard}
                              className="mb-1 flex items-center gap-2"
                            >
                              <Checkbox
                                className="h-5 w-5"
                                value={standard}
                                checked={selectedStandards.includes(standard)}
                                onChange={handleCheckboxChange}
                              />
                              <Label htmlFor={standard} className="text-base">
                                [{standard}] {standardMap[standard]}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    )
                  : !messageDisplayed && (
                      <div key="message">
                        <p className="text-sm text-gray-500">
                          Select an Industry to view available standards
                        </p>
                        {(messageDisplayed = true)}
                      </div>
                    )
              )}
            </div>

            <div>
              <Button type="submit" size="sm">
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;

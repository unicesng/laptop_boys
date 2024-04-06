import HomeImage from "./assets/HomeImage.jpg";
import Company from './assets/Company.png';
import Person from './assets/Person.jpeg'
import EnergyCompanies from './assets/EnergyCompanies.jpg'
import RetailCompanies from './assets/RetailCompanies.jpg'
import FinanceCompanies from './assets/FinanceCompanies.jpeg'

function App() {

  const industries = [
    {
      name: "Energy",
      url: EnergyCompanies
    },
    {
      name: "Retail",
      url: RetailCompanies
    },
    {
      name: "Finance",
      url: FinanceCompanies
    },
  ]

  return (
    <>
      <main className="w-full">
        <div
          style={{
            backgroundImage: `url(${HomeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex min-h-screen flex-col items-center justify-center p-24"
        >
          <div className="text-5xl font-bold text-white text-center">
            Empower your business for a Sustainable Future
          </div>
          <br />
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Get Started
          </a>
        </div>
        <div className="flex min-h-screen items-center justify-around p-24">
          <div className="items-center flex flex-col justify-center">
            <img src={Person} alt="Person Image" height={300} width={300} />
            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-green-600 dark:text-white">
              Bottom-up Approach
            </h5>
            <p className="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">
              Departments to upload their metrics manually or through automation
            </p>
          </div>
          <div className="items-center flex flex-col justify-center">
            <img src={Company} alt="Company Image" height={250} width={200} />
            <br />
            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-green-600 dark:text-white">
              Sustainable Leadership
            </h5>
            <p className="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">
              Identify bottlenecks and become more sustainable
            </p>
          </div>
        </div>
        <div className="min-h-screen items-center justify-center p-24">
          <h2 className="text-center mb-2 text-4xl font-bold tracking-tight text-green-600 dark:text-white">
            Industries Supported
          </h2>
          <br />
          <div className="flex justify-around">
            {
              industries?.map((industry) => (
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{industry.name}</h5>
                  </a>
                  <img src={industry.url} width={500} /> 
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

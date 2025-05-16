import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import type { Country } from "./utils";
import Card from "./component/Card";

function App() {
  // const API_ALL = "https://restcountries.com/v3.1/all";
  const [search, setSearch] = useState("Egypt");
  const [country, setCountry] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValid, setInputValid] = useState({
    validToSearch: true,
    ValidCountry: false,
  });

  const handleSearch = () => {
    setIsLoading(true);
    setCountry([]); // Clear previous results
    axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then((res) => {
        setCountry(res.data);
        setInputValid({
          validToSearch: true,
          ValidCountry: res.data.length > 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setInputValid({
          validToSearch: true,
          ValidCountry: false,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setInputValid({
      validToSearch: e.target.value.trim() !== "",
      ValidCountry: false,
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="flex flex-col items-center  gap-6 p-8  text-white rounded-b-xl shadow-2xl mb-10">
        <h2 className="text-5xl font-extrabold text-center text-indigo-400 tracking-tight">
          Country Search
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mb-10">
          <div className="relative flex-grow w-full">
            <input
              onChange={handleInputChange}
              value={search}
              type="text"
              placeholder="Search for a country"
              className="w-full p-3 pl-12 text-black rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-md placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!inputValid.validToSearch || isLoading}
            className={`
              ${
                inputValid.validToSearch && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-500 text-black cursor-not-allowed"
              } text-white font-bold py-3 px-6 rounded-md shadow-md transition-colors duration-300 w-full sm:w-auto`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </header>
      <div>
        {isLoading && (
          <div className="flex justify-around w-full gap-4 rounded-lg shadow-md p-4 animate-pulse text-white">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-40 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <div className="h-5 bg-gray-300 rounded w-4/5" />
              <div className="h-5 bg-gray-300 rounded w-2/3" />
              <div className="h-5 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
        )}
        {!isLoading &&
          country.length === 0 &&
          inputValid.ValidCountry === false &&
          search.trim() !== "" && <p>No country found for "{search}"</p>}
        <div>
          {!isLoading &&
            country &&
            country
              .slice(0, 10)
              .map((country: Country) => (
                <Card key={country.name.common} country={country} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;

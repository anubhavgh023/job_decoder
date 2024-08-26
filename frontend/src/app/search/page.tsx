"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import { Company } from "@/types/company";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Company[]>([]); // structure this obj

  async function handleSearch() {
    const res = await axios.get(
      `http://localhost:8000/search/?keyword=${query}`
    );
    const data = res.data;
    setResults(data.data);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleSearch();
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
        searchInput?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query]);

  return (
    <main className="p-5 flex flex-col gap-4 sm:gap-12 justify-center items-center mt-10">
      {/* search */}
      <div className="flex gap-5">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            autoComplete="off"
            placeholder="Enter your skills..."
            className="border-none py-2 p-2 rounded-sm bg-secondary font-medium outline-none focus:ring focus:ring-gray-500 sm:pr-20"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <span className="absolute right-4 top-3 border text-xs text-gray-500 font-semibold">Ctrl + K</span>
        </div>

        <button
          className="bg-primary font-medium text-primary-foreground px-4 rounded-md active:scale-95"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* show results */}
      <div className="border rounded-md border-secondary p-10 mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((company) => (
            <Card key={company.company_id} company={company}></Card>
          ))
        ) : (
          <p>No Result found</p>
        )}
      </div>
    </main>
  );
}

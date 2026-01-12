"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
export default function Search({ breeds }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredBreeds = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return breeds;
    }
    return breeds.filter((breed) =>
      breed.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, breeds]);

  return (
    <>
      <input
        className="w-full p-2 rounded-md border border-[#d1d1e9] max-w-md mx-auto"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-4">
        <ul className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {filteredBreeds.map((breed) => (
            <Link
              href={`/breed/${breed}`}
              key={breed}
              className="button-primary"
            >
              {breed}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

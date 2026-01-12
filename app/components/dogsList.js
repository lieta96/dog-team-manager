"use client";
import { useState, useEffect } from "react";
import DogCard from "./dogCard";
import Pagination from "./pagination";
export default function DogsList({ images, breed }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(images.length / 12));
  const [dogs, setDogs] = useState(images.slice(0, 12));
  useEffect(() => {
    setDogs(images.slice((currentPage - 1) * 12, currentPage * 12));
  }, [currentPage, images]);
  useEffect(() => {
    setTotalPages(Math.ceil(images.length / 12));
  }, [images]);
  return (
    <div className="flex flex-col gap-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8">
        {dogs.map((dog, index) => (
          <DogCard dog={{id: dog.split("/").pop(), image: dog}} key={index} breed={breed} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

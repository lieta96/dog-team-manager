import { useContext } from "react";
import { TeamContext } from "../context/teamContext";
import DogCard from "./dogCard";
import Link from "next/link";
export default function MyTeam() {
  const { team } = useContext(TeamContext);
  return (
    <div className="flex flex-col gap-8">
      {team.totalDogs > 0 ? (
        <p>Total dogs: {team.totalDogs}</p>
      ) : (
        <p className="text-center">
          Start adding dogs to your team! Visit the{" "}
          <Link className="text-button font-bold" href="/">
            home page
          </Link>{" "}
          to explore breeds.
        </p>
      )}
      <ul className="flex flex-col gap-8">
        {Object.entries(team.dogs).map(([breed, dogs]) => (
          <li key={breed} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold uppercase">{breed}</h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {dogs.map((dog) => (
                <DogCard key={dog.id} breed={breed} dog={dog} />
              ))}
            </ul>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}

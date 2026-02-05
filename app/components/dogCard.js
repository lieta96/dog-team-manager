import Image from "next/image";
import { useContext } from "react";
import { TeamContext } from "../context/teamContext";
export default function DogCard({ dog, breed }) {
  const { addToTeam, removeFromTeam, team } = useContext(TeamContext);
  const isInTeam = team.dogs[breed]?.some((d) => d.id === dog.id);
  const isInTeam = team.dogs[breed]?.some((d) => d.id === dog.id);
  return (
    <div className="flex flex-col items-center justify-between gap-4 bg-secondary p-4 rounded-lg shadow-md">
      <Image
        src={dog.image}
        width={100}
        height={100}
        alt={`Dog ${dog}`}
        className="rounded-lg aspect-square object-cover w-full h-full"
      />
      <button
        className={`button-${isInTeam ? "secondary" : "primary"} w-full`}
        onClick={() =>
          isInTeam ? removeFromTeam(dog, breed) : addToTeam(dog, breed)
        }
      >
        {isInTeam ? "Remove from my Team" : "Add to my Team"}
      </button>
    </div>
  );
}

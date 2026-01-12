"use client";
import { createContext } from "react";
import { useState, useEffect } from "react";
export const TeamContext = createContext();
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState({ totalDogs: 0, dogs: {} });
    let [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    async function getLocalTeam() {
      try {
        const stored = localStorage.getItem("dog-team-manager");
        if (stored) {
          setTeam(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error reading team from localStorage:", error);
      }
    }
    getLocalTeam();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dog-team-manager", JSON.stringify(team));
    } catch (error) {
      console.error("Error saving team to localStorage:", error);
    }
  }, [team]);
  const addToTeam = (dog, breed) => {
    const newTeam = { ...team };

    if (team.totalDogs < 10) {
      if (!team.dogs[breed]) {
        newTeam.dogs[breed] = [];
      }
      if (newTeam.dogs[breed].length < 3) {
        newTeam.dogs[breed].push(dog);
        newTeam.totalDogs = newTeam.totalDogs + 1;
        setTeam(newTeam);
      } else {
        setIsOpen(true);
        setErrorMessage(
          "You can only have 3 dogs of the same breed in your team"
        );
      }
    } else {
      setIsOpen(true);
      setErrorMessage("You can only have 10 dogs in your team");
    }
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function getIsMounted() {
      setIsMounted(true);
    }
    getIsMounted();
  }, []);
  const removeFromTeam = (dog, breed) => {
    const newTeam = { ...team };
    newTeam.dogs[breed] = newTeam.dogs[breed].filter((d) => d.id !== dog.id);
    if (newTeam.dogs[breed].length === 0) {
      delete newTeam.dogs[breed];
    }
    newTeam.totalDogs = newTeam.totalDogs - 1;
    setTeam(newTeam);
  };

  return (
    <TeamContext.Provider value={{ team, setTeam, addToTeam, removeFromTeam }}>
      {children}
      {isMounted && (
        <div>
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
            __demoMode
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md 
                  bg-secondary
                  rounded-xl  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                  <p className="mt-2 ">{errorMessage}</p>
                  <div className="mt-4">
                    <Button className="button-primary" onClick={close}>
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </TeamContext.Provider>
  );
};

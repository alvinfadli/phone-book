"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SelectedContactContextType {
  selectedContactId: number | undefined;
  setSelectedContactId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

interface Props {
  children: React.ReactNode;
}

const SelectedContactContext = createContext<SelectedContactContextType>({
  selectedContactId: undefined,
  setSelectedContactId: () => {},
});

export const useSelectedContact = () => useContext(SelectedContactContext);

export const SelectedContactProvider: React.FC<Props> = ({ children }) => {
  const [selectedContactId, setSelectedContactId] = useState<
    number | undefined
  >(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("selectedContactId");
      return storedValue ? JSON.parse(storedValue) : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedContactId",
      JSON.stringify(selectedContactId)
    );
  }, [selectedContactId]);

  return (
    <SelectedContactContext.Provider
      value={{ selectedContactId, setSelectedContactId }}
    >
      {children}
    </SelectedContactContext.Provider>
  );
};

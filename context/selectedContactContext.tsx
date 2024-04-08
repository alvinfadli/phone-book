"use client";
import React, { createContext, useContext, useState } from "react";

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
  >(1);

  return (
    <SelectedContactContext.Provider
      value={{ selectedContactId, setSelectedContactId }}
    >
      {children}
    </SelectedContactContext.Provider>
  );
};

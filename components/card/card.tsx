import React from "react";
import Contact from "@/types/contact";
import { useSelectedContact } from "@/context/selectedContactContext";
import { useRouter } from "next/navigation";

const Card: React.FC<Contact> = ({ ID, name, phone }) => {
  const router = useRouter();
  const { setSelectedContactId } = useSelectedContact();

  const handleClick = () => {
    setSelectedContactId(ID);
    router.push("/details");
  };

  return (
    <button className="card">
      <div
        className="border border-slate-600 mb-1 rounded-md p-4"
        onClick={handleClick}
      >
        <div className="flex justify-between">
          <div>
            <h2>{name}</h2>
          </div>
          <p>{phone}</p>
        </div>
      </div>
    </button>
  );
};

export default Card;

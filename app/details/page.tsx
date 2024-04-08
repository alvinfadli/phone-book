"use client";
import React, { useEffect, useState } from "react";
import Contact from "@/types/contact";
import { useSelectedContact } from "@/context/selectedContactContext";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContactDetail() {
  const router = useRouter();
  const [data, setData] = useState<Contact>();
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedContactId } = useSelectedContact();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/contacts/${selectedContactId}`
      );
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/contacts/${selectedContactId}`,
        {
          method: "DELETE",
        }
      );
      const jsonData = await response.json();

      if (jsonData.status.code === 200) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-slate-600 mb-1 rounded-md p-4">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold">{data?.name}</h2>
          <h1>{data?.email}</h1>
        </div>
        <p>{data?.phone}</p>
      </div>
      <div className="flex justify-end gap-1">
        <Link
          href={"/edit"}
          className="flex justify-center items-center p-1.5 rounded-md bg-yellow-700 hover:bg-yellow-800"
        >
          <Pencil color="white" size={24} />
        </Link>
        <button
          className="flex justify-center items-center p-1.5 rounded-md bg-red-700 hover:bg-red-800"
          onClick={deleteData}
        >
          <Trash2 color="white" size={24} />
        </button>
      </div>
    </div>
  );
}

// export default ContactDetail;

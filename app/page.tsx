"use client";
import React, { useState, useEffect } from "react";
import Contact from "@/types/contact";
import Card from "@/components/card/card";
import { RotateCcw, Search, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`
      );
      const jsonData = await response.json();
      setData(jsonData.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error("Error searching data: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleReset = () => {
    setName("");
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]">
            <div className="py-1.5 flex gap-1">
              <input
                type="text"
                className="outline outline-1 outline-slate-600 p-2 rounded-md w-[120px] md:w-full h-10"
                placeholder="Search..."
                value={name}
                onChange={handleChange}
              />
              <button
                className="flex justify-center items-center bg-black p-2 h-10 rounded-md hover:bg-slate-800"
                onClick={handleSearch}
              >
                <Search color="white" size={22} />
              </button>
            </div>
            <div className="py-1.5 flex gap-1.5 justify-center items-center">
              <button
                className="flex justify-center items-center bg-black p-2 h-10 rounded-md hover:bg-slate-800"
                onClick={handleReset}
              >
                <RotateCcw color="white" size={22} />
              </button>
              <Link
                className="flex gap-1 justify-center items-center bg-black p-1.5 h-10 px-2 rounded-md hover:bg-slate-800"
                href={"/create"}
              >
                <UserPlus color="white" size={20} />
                <p className="text-white">New</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          {data?.map((item) => (
            <Card key={item.ID} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

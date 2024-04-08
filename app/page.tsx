"use client";
import React, { useState, useEffect } from "react";
import Contact from "@/types/contact";
import Card from "@/components/card/card";
import { RotateCcw, Search, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/contacts");
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
        `http://localhost:8080/api/v1/contacts/search?term=${searchTerm}`
      );
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error("Error searching data: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="search-container mx-auto">
          <div className="flex justify-between">
            <div className="py-1.5 flex gap-1">
              <input
                type="text"
                className="outline outline-1 outline-slate-600 p-2 rounded-md h-10"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
              />
              <button className="flex justify-center items-center bg-black p-2 h-10 rounded-md hover:bg-slate-800">
                <Search color="white" size={22} />
              </button>
            </div>
            <div className="py-1.5 flex gap-1.5 justify-center items-center">
              <button className="flex justify-center items-center bg-black p-2 h-10 rounded-md hover:bg-slate-800">
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
        <div className="flex flex-col">
          {data.map((item) => (
            <Card key={item.ID} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Contact from "@/types/contact";
import { useSelectedContact } from "@/context/selectedContactContext";
import { Mail, MapPin, Pencil, Phone, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { parseTimestamp } from "@/utils/time_parser";
import { toast } from "react-hot-toast";
import Dialog from "@/components/dialog/dialog";

export default function ContactDetail() {
  const router = useRouter();
  const [data, setData] = useState<Contact>();
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedContactId } = useSelectedContact();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${selectedContactId}`
      );
      const jsonData = await response.json();
      setData(jsonData.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${selectedContactId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.status.code === 200) {
        toast("Contact data deleted!", { icon: "🗑️" });
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && (
        <Dialog
          title="Are you sure you want to delete this contact?"
          onClose={handleCloseDialog}
          onOk={deleteData}
        >
          <p>
            Deleting this contact will permanently remove all associated data
            and cannot be undone. Please confirm your action below.
          </p>
        </Dialog>
      )}

      <div className="border border-slate-600 mb-1 rounded-md p-4">
        <div className="flex justify-between">
          <div className="">
            <div className="flex items-center gap-1 mb-2">
              <User size={16} />
              <h2 className="font-bold">{data?.name}</h2>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <MapPin size={16} />
              <h2 className="">{data?.address}</h2>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Mail className="pt-0.5" size={16} />
              <a href={`mailto:${data?.email}`} className="">
                {data?.email}
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Phone className="pt-0.5" size={16} />
              <h2 className="">{data?.phone}</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-1 mt-5">
          <div className="pt-5 text-slate-400 italic">
            <p>Last updated : {parseTimestamp(data?.UpdatedAt)}</p>
          </div>
          <div className="flex gap-1">
            <Link
              href={"/edit"}
              className="flex justify-center items-center p-2 rounded-md bg-yellow-700 hover:bg-yellow-800"
            >
              <Pencil color="white" size={22} />
            </Link>
            <button
              className="flex justify-center items-center p-2 rounded-md bg-red-700 hover:bg-red-800"
              onClick={handleOpenDialog}
            >
              <Trash2 color="white" size={22} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

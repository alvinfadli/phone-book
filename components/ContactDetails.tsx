"use client";
import { useState } from "react";
import Contact from "@/types/contact";
import { Mail, MapPin, Pencil, Phone, Trash2, User } from "lucide-react";
import Link from "next/link";
import { parseTimestamp } from "@/utils/time_parser";
import Dialog from "@/components/ui/modal-dialog";
import { useDeleteContact, useFetchContactByID } from "@/hooks/hooks";

interface ContactDetailsProps {
  contact: Contact;
}

const ContactDetails = ({ contact }: ContactDetailsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteData } = useDeleteContact();

  const handleDelete = async () => {
    await deleteData();
  };

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
          onOk={handleDelete}
        >
          <p>
            Deleting this contact will permanently remove all associated data
            and cannot be undone. Please confirm your action below.
          </p>
        </Dialog>
      )}

      <div className="flex justify-between">
        <div className="">
          <div className="flex items-center gap-1 mb-2">
            <User size={16} />
            <h2 className="font-bold">{contact.name}</h2>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={16} />
            <h2 className="">{contact.address}</h2>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <Mail className="pt-0.5" size={16} />
            <a href={`mailto:${contact.email}`} className="">
              {contact.email}
            </a>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Phone className="pt-0.5" size={16} />
            <h2 className="">{contact.phone}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1 mt-5">
        <div className="pt-5 text-slate-400 italic">
          <p>Last updated : {parseTimestamp(contact.UpdatedAt)}</p>
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
    </>
  );
};

export default ContactDetails;

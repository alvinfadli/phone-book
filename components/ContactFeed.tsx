import Contact from "@/types/contact";
import React from "react";
import ContactCard from "./ContactCard";

interface ContactFeedProps {
  contacts: Contact[];
}

const ContactFeed = ({ contacts }: ContactFeedProps) => {
  return (
    <div>
      {contacts.map((contact) => (
        <ContactCard key={contact.ID} contact={contact} />
      ))}
    </div>
  );
};

export default ContactFeed;

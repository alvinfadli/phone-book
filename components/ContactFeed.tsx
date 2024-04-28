import Contact from "@/types/contact";
import React from "react";
import ContactCard from "./ContactCard";

/* Contact Feed Component */

interface ContactFeedProps {
  loading: boolean;
  contacts: Contact[];
}

const ContactFeed = ({ loading, contacts }: ContactFeedProps) => {
  return (
    <div className="flex flex-col gap-2">
      {loading && <div>Loading...</div>}
      {contacts.map((contact) => (
        <ContactCard key={contact.ID} contact={contact} />
      ))}
    </div>
  );
};

export default ContactFeed;

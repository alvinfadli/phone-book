import Card from "@/components/ui/card";
import { useSelectedContact } from "@/context/selectedContactContext";
import Contact from "@/types/contact";
import { useRouter } from "next/navigation";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const router = useRouter();
  const { setSelectedContactId } = useSelectedContact();

  const handleClick = () => {
    setSelectedContactId(contact.ID);
    router.push("/details");
  };

  return (
    <Card className="justify-between" onClick={handleClick}>
      <h1 className="font-medium">{contact.name}</h1>
      <p>{contact.phone}</p>
    </Card>
  );
};

export default ContactCard;

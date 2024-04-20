import Card from "@/components/ui/Card";
import Contact from "@/types/contact";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <Card>
      <h1 className="font-medium">{contact.name}</h1>
      <p>{contact.phone}</p>
    </Card>
  );
};

export default ContactCard;

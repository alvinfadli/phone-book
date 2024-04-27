"use client";
import ContactForm from "@/components/ContactForm";
import { useFetchContactByID } from "@/hooks/hooks";

const EditPage = () => {
  const { data } = useFetchContactByID();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ContactForm
        contact={{
          ID: data.ID,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          CreatedAt: data.CreatedAt,
          UpdatedAt: data.UpdatedAt,
        }}
      />
    </>
  );
};

export default EditPage;

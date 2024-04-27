"use client";
import ContactDetails from "@/components/ContactDetails";
import { useFetchContactByID } from "@/hooks/hooks";

const DetailsPage = () => {
  const { data } = useFetchContactByID();

  if (!data) {
    return <p>No data!</p>;
  }

  return (
    <>
      <div className="border border-slate-600 mb-1 rounded-md p-4">
        <ContactDetails contact={data} />
      </div>
    </>
  );
};

export default DetailsPage;

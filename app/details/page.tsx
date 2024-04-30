"use client";
import ContactDetails from "@/components/ContactDetails";
import { ContactDetailsSkeleton } from "@/components/ContactDetailsSkeleton";
import { useFetchContactByID } from "@/hooks/hooks";

const DetailsPage = () => {
  const { data, loading } = useFetchContactByID();

  return (
    <>
      <div className="border border-slate-300 mb-1 rounded-md p-4">
        {loading ? (
          <ContactDetailsSkeleton />
        ) : (
          data && <ContactDetails contact={data} />
        )}
      </div>
    </>
  );
};

export default DetailsPage;

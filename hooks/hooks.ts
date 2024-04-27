import Contact from "@/types/contact";
import { useEffect, useState } from "react";
import { useSelectedContact } from "@/context/selectedContactContext";
import { useRouter } from "next/navigation";

// TODO use react query
export const useFetchContact = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`
      );
      const jsonData = await response.json();
      setData(jsonData.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return { data };
};

export const useFetchContactByID = () => {
  const { selectedContactId } = useSelectedContact();
  const [data, setData] = useState<Contact>();
  const [loading, setLoading] = useState<boolean>(true);

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

  return { data };
};

export const useDeleteContact = () => {
  const { selectedContactId } = useSelectedContact();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
        // toast("Contact data deleted!", { icon: "🗑️" });
        router.replace("/");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return { deleteData, loading };
};

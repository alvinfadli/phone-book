import Contact from "@/types/contact";
import { useEffect, useState } from "react";
import { useSelectedContact } from "@/context/selectedContactContext";
import { useRouter } from "next/navigation";

// TODO use react query
export const useFetchContact = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [data, setData] = useState<Contact[]>([]);
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);

      fetchData(debounceSearch);

      setLoading(false);
    };
    loadContacts();
  }, [debounceSearch]);

  const fetchData = async (search: string = "") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts?name=${search}`
      );
      const jsonData = await response.json();
      setData(jsonData.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return { data, loading, setLoading, setSearch };
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
      setData(jsonData.data ?? null);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return { data, loading };
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

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

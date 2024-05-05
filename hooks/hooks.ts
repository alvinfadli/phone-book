import Contact from "@/types/contact";
import { useEffect, useState } from "react";
import { useSelectedContact } from "@/context/selectedContactContext";
import { useRouter, useSearchParams } from "next/navigation";

// TODO use react query
export const useFetchContact = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [data, setData] = useState<Contact[]>([]);
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    lastPage: 0,
    page: 1,
    perPage: 10,
    total: 0,
  });

  console.log(pagination.page);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData(debounceSearch);
    setLoading(false);
  }, [debounceSearch]);

  const fetchData = async (search: string | null = "") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts?name=${search}&page=${pagination.page}&perPage=${pagination.perPage}`
      );
      const jsonData = await response.json();
      setData(jsonData.data.contacts);
      setPagination(jsonData.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    search,
    setSearch,
  };
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

export const useDebounce = <T>(value: T, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

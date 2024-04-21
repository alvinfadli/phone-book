import Contact from "@/types/contact";
import { useEffect, useState } from "react";

export const useContactPage = () => {
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

"use client";
import React from "react";
import { useFetchContact } from "@/hooks/hooks";
import ContactFeed from "@/components/ContactFeed";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/searchbar";
import { ContactCardSkeleton } from "@/components/ContactCardSkeleteon";

/* Contact Page */

export default function Home() {
  const router = useRouter();
  const { data, loading, setSearch } = useFetchContact();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("name", term);
      setSearch(term);
    } else {
      params.delete("name");
      setSearch("");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]"></div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between mb-2">
            <div>
              <SearchBar
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
            <div>
              <Button
                variant={"default"}
                about="Add"
                onClick={() => router.push("/create")}
              >
                Add
              </Button>
            </div>
          </div>
          {loading ? <ContactCardSkeleton /> : <ContactFeed contacts={data} />}
        </div>
      </div>
    </main>
  );
}

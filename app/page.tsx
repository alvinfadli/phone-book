"use client";
import React from "react";
import { useFetchContact } from "@/hooks/hooks";
import ContactFeed from "@/components/ContactFeed";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/searchbar";
import { ContactCardSkeleton } from "@/components/ContactCardSkeleteon";
import PaginationControls from "@/components/PaginationControls";

/* Contact Page */

export default function Home() {
  const router = useRouter();
  const { data, loading, setSearch } = useFetchContact();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]"></div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between mb-2">
            <div>
              <SearchBar onChange={setSearch} />
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
          <div className="flex justify-end mt-5">
            <div>
              <PaginationControls />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

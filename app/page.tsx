"use client";
import React, { useState } from "react";
import { useFetchContact } from "@/hooks/hooks";
import ContactFeed from "@/components/ContactFeed";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/searchbar";
import { ContactCardSkeleton } from "@/components/ContactCardSkeleteon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "@/components/PaginationControls";

/* Contact Page */

export default function Home() {
  const router = useRouter();
  const { data, loading, setSearch } = useFetchContact();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: any) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (searchQuery) {
      params.set("name", searchQuery);
      params.set("page", "1");
      setSearch(searchQuery);
    } else {
      params.delete("name");
      params.delete("page");
      setSearch("");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]"></div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between mb-2 ">
            <div>
              <form className="max-w-lg mx-auto" onSubmit={handleSearch}>
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 border"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-e-lg"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="mt-0.5">
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
              {/* <PaginationControls
                gotoPage={gotoPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                page={page}
                lastPage={lastPage}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useFetchContact } from "@/hooks/hooks";
import ContactFeed from "@/components/ContactFeed";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/* Contact Page */

export default function Home() {
  const router = useRouter();
  const { data } = useFetchContact();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]"></div>
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between mb-2">
            <div></div>
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
          <ContactFeed contacts={data} />
        </div>
      </div>
    </main>
  );
}

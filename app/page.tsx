"use client";
import React, { useState, useEffect } from "react";
import { useContactPage } from "./ContactPage.hooks";
import ContactFeed from "@/components/ContactFeed";

/* Contact Page */

export default function Home() {
  const { data } = useContactPage();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        <div className="mx-auto">
          <div className="flex  justify-between px-[1px]"></div>
        </div>
        <div className="flex flex-col ">
          <ContactFeed contacts={data} />
        </div>
      </div>
    </main>
  );
}

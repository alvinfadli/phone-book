"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/Buttondelete";
import { useRouter } from "next/navigation";

import Contact from "@/types/contact";
import { Input } from "./ui/input";
import { PhoneInput } from "./ui/phone-input";

const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type ContactFormProps = {
  contact?: Contact;
};

const ContactForm = ({ contact }: ContactFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // set default value for editing
    defaultValues: contact
      ? {
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address,
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  // TODO: need to handle error msg
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (contact) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${contact.ID}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.log("Error editing contact data!");
      }
      router.replace("/details");
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.log("Error creating new contact data!");
      }
      router.replace("/");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("name")} placeholder="Name" text="Name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      {/* <Input {...register("phone")} placeholder="Phone" text="Phone" /> */}
      <label className="block text-sm font-medium text-gray-900">Phone</label>
      <PhoneInput
        international={true}
        defaultCountry="ID"
        placeholder="Enter a phone number"
        value={contact ? contact.phone : undefined}
        onChange={(phone) => {
          if (phone) {
            setValue("phone", phone);
          }
        }}
      />
      {errors.phone && (
        <div className="text-red-500">{errors.phone.message}</div>
      )}
      <Input {...register("email")} placeholder="Email" text="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <Input {...register("address")} placeholder="Address" text="Address" />
      {errors.address && (
        <div className="text-red-500">{errors.address.message}</div>
      )}
      <div className="flex justify-end my-4 gap-1.5">
        <Button
          onClick={() => router.replace("/")}
          type="button"
          text="Cancel"
          variant="secondary"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          text={isSubmitting ? "Loading..." : "Submit"}
          variant="primary"
        />
      </div>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default ContactForm;

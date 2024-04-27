"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

import Contact from "@/types/contact";

const formSchema = z.object({
  name: z.string(),
  phone: z.string().min(12),
  email: z.string().email(),
  address: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

type ContactFormProps = {
  contact?: Contact;
};

const ContactForm = ({ contact }: ContactFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
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
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Phone number
        </label>
        <input
          {...register("phone")}
          type="number"
          placeholder="Phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      {errors.phone && (
        <div className="text-red-500">{errors.phone.message}</div>
      )}
      <div>
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email Address
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <div>
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
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

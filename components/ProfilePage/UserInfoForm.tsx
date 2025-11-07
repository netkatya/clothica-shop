"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { UserProfile } from "@/types/user";

interface Props {
  user: UserProfile | null;
}

export default function UserInfoForm({ user }: Props) {
  const [form, setForm] = useState<UserProfile>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    city: user?.city || "",
    npOffice: user?.npOffice || "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/update`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Зміни збережено");
  }

  return (
    <form className="user-info" onSubmit={handleSubmit}>
      <input name="firstName" value={form.firstName} onChange={handleChange} />
      <input name="lastName" value={form.lastName} onChange={handleChange} />
      <input name="phone" value={form.phone} onChange={handleChange} />
      <input name="city" value={form.city} onChange={handleChange} />
      <input name="npOffice" value={form.npOffice} onChange={handleChange} />

      <button type="submit">Зберегти зміни</button>
    </form>
  );
}

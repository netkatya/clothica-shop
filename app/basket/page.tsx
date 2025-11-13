import { redirect } from "next/navigation";

export default function BasketRedirectPage() {
  redirect("/order");
}
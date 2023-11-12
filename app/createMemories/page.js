import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import InputForm from "@/components/InputForm/InputForm";
import "./styles.css";

export default async function uploadPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url("https://worldofprintables.com/wp-content/uploads/2023/07/White-Cat-Background.jpg")`,
      }}
    >
      <div className="wrapper">
        <InputForm />
      </div>
    </div>
  );
}

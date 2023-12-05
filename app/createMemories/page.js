import InputForm from "@/components/InputForm/InputForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "./styles.css";

export default async function uploadPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div
      className="container_input_page"
      style={{
        backgroundImage: `url("/bg.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <InputForm />
    </div>
  );
}

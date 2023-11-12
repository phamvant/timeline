import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import InputForm from "@/components/InputForm/InputForm";
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
        backgroundImage: `url("https://worldofprintables.com/wp-content/uploads/2023/07/White-Cat-Background.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <InputForm />
    </div>
  );
}

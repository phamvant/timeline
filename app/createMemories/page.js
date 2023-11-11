import GlassForm from "@/components/GlassForm/GlassForm";
import "./styles.css";

const uploadPage = () => {
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url("https://worldofprintables.com/wp-content/uploads/2023/07/White-Cat-Background.jpg")`,
      }}
    >
      <div className="wrapper">
        <GlassForm />
      </div>
    </div>
  );
};

export default uploadPage;

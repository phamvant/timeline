import Timeline from "@/components/Timeline/Timeline";
const { image } = require("../components/image_dummy.json");

const Home = () => {
  const timelineData = {
    title: "Our Sacred Timeline",
    subtitle: "For all time, always",
    items: image,
  };

  return (
    <div>
      <Timeline timelineData={timelineData} />
    </div>
  );
};

export default Home;

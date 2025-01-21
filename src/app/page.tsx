import Banner from "./components/banner";
import WhyChoose from "./components/why-choose";
import MultiWaysSendMoney from "./components/multi-ways-send-money";
import DownloadApp from "./components/download-app";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChoose />
      <MultiWaysSendMoney />
      <DownloadApp />
    </div>
  );
}

import Title from "@/components/Title";

import localFont from "next/font/local";

import MMa_BG_BIG from "@/assets/MMa-Bg-Big.png";
import f1_BG_BIG from "@/assets/f1-Bg-Big.png";
import HistoryCard from "@/components/HistoryCard";

import NewsCard from "@/components/NewsCard";
import QASection from "@/features/landing/QASection";
import { getApiBaseUrl } from "@/utils/getBaseUrl";
import Image from "next/image";
import { HistoryItem, NewsItem } from "../../types/Article.types";

const getFontGeo = localFont({
  src: "../../public/fonts/font_geo.ttf",
});

const Page = async () => {
  const API_BASE_URL = getApiBaseUrl();

  let news: NewsItem[] = [];
  let histories: HistoryItem[] = [];

  try {
    const [newsResponse, historiesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/article/landing/news`),
      fetch(`${API_BASE_URL}/article/landing/histories`),
    ]);

    if (!newsResponse.ok) throw new Error("Failed to fetch news");
    if (!historiesResponse.ok) throw new Error("Failed to fetch histories");

    news = await newsResponse.json();
    histories = await historiesResponse.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <main
      className={`w-full min-h-screen bg-[#D9D9D9] ${getFontGeo.className} py-10`}
    >
      {/* <HeroMain /> */}
      <section className="px-4 sm:px-8 md:px-14 lg:px-44 transition-all duration-300">
        {/* News Section */}
        <div className="mb-16">
          <Title title="ახალი ამბები" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            {news.map((news) => (
              <NewsCard news={news} key={news._id} />
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="mb-16">
          <Title title="ისტორიები" />
          <div className="flex flex-col gap-8 my-8">
            {histories.map((history) => (
              <HistoryCard history={history} key={history._id} />
            ))}
          </div>
        </div>

        {/* Full-width Image Banner */}
        <div className="w-full h-80 md:h-[28rem] relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
          <Image
            src={MMa_BG_BIG}
            alt="MMa Background"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            quality={90}
            priority={false}
          />
          {/* Overlay with MMA text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
            <h2 className="text-primary text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider transform group-hover:scale-110 transition-transform duration-500">
              MMA
            </h2>
          </div>
        </div>

        {/* Full-width Image Banner 2 */}
        <div className="w-full h-80 md:h-[35rem] relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group mt-20 cursor-pointer">
          <Image
            src={f1_BG_BIG}
            alt="f1 Background"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            quality={90}
            priority={false}
          />
          {/* Overlay with MMA text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
            <h2 className="text-primary text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider transform group-hover:scale-110 transition-transform duration-500">
              შემოაბიჯე f1 სამყაროში
            </h2>
          </div>
        </div>
        <QASection />
      </section>
    </main>
  );
};

export default Page;

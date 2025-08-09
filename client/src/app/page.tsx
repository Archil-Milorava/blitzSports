import Title from "@/components/Title";

import localFont from "next/font/local";

import HistoryCard from "@/components/HistoryCard";

import F1Banner from "@/components/F1Banner";
import MmaBanner from "@/components/MmaBanner";
import NewsCard from "@/components/NewsCard";
import QASection from "@/features/landing/QASection";
import { getApiBaseUrl } from "@/utils/getBaseUrl";
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
      fetch(`${API_BASE_URL}/article/landing/news`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/article/landing/histories`, { cache: "no-store" }),
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
        <MmaBanner />
        <F1Banner />
        <QASection />
      </section>
    </main>
  );
};

export default Page;

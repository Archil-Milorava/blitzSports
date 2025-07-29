import React from "react";

const stories = [
  {
    title: "გიორგი მიქაუტაძე: პარიზის დიდი გეგმები",
    excerpt:
      "ფრანგული გიგანტი მიქაუტაძეს 35 მილიონ ევროდ აფასებს. როგორ შეიცვლის ეს ქართული ფეხბურთის ისტორიას?",
    category: "Exclusive",
    image:
      "https://cdn.ge.betsson.sport/1cd01a4c-1640-4941-ad10-451ee9fa2b36.jpg",
    url: "#",
    published: "2023-08-15T14:30:00Z",
  },
  {
    title: "ხვიჩას ახალი ერა ნაპოლისში",
    excerpt:
      "კვარაცხელიამ კონტრაქტი გაახანგრძლივა - რას ელოდება ქართველი ვარსკვლავი იტალიაში?",
    category: "Feature",
    image:
      "https://cdn.ge.betsson.sport/fd8b02b9-0103-4927-89c0-6b864f391d7a.jpg",
    url: "#",
    published: "2023-08-14T18:45:00Z",
  },
  {
    title: "დინამოს ევროპული ამბიციები",
    excerpt:
      "3 ახალი ტრანსფერი და ევროპის ლიგის სიზმარი - როგორ ემზადება თბილისის გიგანტი?",
    category: "Analysis",
    image:
      "https://cdn.ge.betsson.sport/f4562cb4-8138-4e09-974d-d7ca642774e3.jpg",
    url: "#",
    published: "2023-08-16T09:15:00Z",
  },
];

const HeroStories = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            ყველაზე საინტერესო ისტორიები
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-xl md:min-h-[300px]"
            >
              {/* Desktop - Full width rectangle */}
              <div className="hidden md:flex">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={story.image}
                  alt={story.title}
                />
                <div className="relative z-20 p-10 flex flex-col justify-end h-[300px] w-full max-w-2xl">
                  <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    {story.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      {story.published}
                    </span>
                    <a
                      href={story.url}
                      className="flex items-center text-sm font-medium text-white hover:text-blue-300 group"
                    >
                      სრულად ნახვა
                      <svg
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile - Compact Card */}
              <div className="md:hidden bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={story.image}
                    alt={story.title}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{story.published}</span>
                    <a href={story.url} className="text-blue-600 font-medium">
                      სრულად
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            ყველა ისტორიის ნახვა
            <svg
              className="ml-3 -mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroStories;

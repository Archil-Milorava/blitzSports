import React from 'react';

const NewsContainer = () => {
  const newsData = [
    {
      "title": "ლიონი ძალიან ძვირს ითხოვს - გიორგი მიქაუტაძე პარიზის სიაშია",
      "content": "გიორგი მიქაუტაძე არსად წასვლას არ აპირებს, მაგრამ პარიზი მისი ტრანსფერის ვარიანტს განიხილავს. ლიონი კი მას 35 მილიონ ევროდ აფასებს.",
      "published": "2023-08-15T14:30:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/1cd01a4c-1640-4941-ad10-451ee9fa2b36.jpg"
    },
    {
      "title": "დინამო თბილისი ევროპის ლიგაზე - ახალი ტრანსფერები",
      "content": "დინამომ 3 ახალი ფეხბურთელი დაიმატა ევროპული ტურნირებისთვის მოსამზადებლად. მათ შორისაა ესპანელი ნახევარმცველი.",
      "published": "2023-08-16T09:15:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/f4562cb4-8138-4e09-974d-d7ca642774e3.jpg"
    },
    {
      "title": "ხვიჩა კვარაცხელიას ახალი კონტრაქტი ნაპოლისთან",
      "content": "ხვიჩა კვარაცხელიამ ნაპოლისთან კონტრაქტი გაახანგრძლივა. ქართველი ვინგერი სერია A-ში კიდევ 3 სეზონს გაატარებს.",
      "published": "2023-08-14T18:45:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/fd8b02b9-0103-4927-89c0-6b864f391d7a.jpg"
    },
    {
      "title": "საქართველოს ნაკრები - ახალი მწვრთნელის კანდიდატები",
      "content": "საქართველოს ნაკრებისთვის მწვრთნელის პოზიციაზე 5 კანდიდატი განიხილება. მათ შორისაა ცნობილი ევროპელი სპეციალისტები.",
      "published": "2023-08-13T11:20:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/22df4245-b8fd-482d-91e8-3442f8bbdf67.jpg"
    },
    {
      "title": "საქართველოს ნაკრები - ახალი მწვრთნელის კანდიდატები",
      "content": "საქართველოს ნაკრებისთვის მწვრთნელის პოზიციაზე 5 კანდიდატი განიხილება. მათ შორისაა ცნობილი ევროპელი სპეციალისტები.",
      "published": "2023-08-13T11:20:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/22df4245-b8fd-482d-91e8-3442f8bbdf67.jpg"
    },
    {
      "title": "საქართველოს ნაკრები - ახალი მწვრთნელის კანდიდატები",
      "content": "საქართველოს ნაკრებისთვის მწვრთნელის პოზიციაზე 5 კანდიდატი განიხილება. მათ შორისაა ცნობილი ევროპელი სპეციალისტები.",
      "published": "2023-08-13T11:20:00Z",
      "category": "football",
      "image_url": "https://cdn.ge.betsson.sport/22df4245-b8fd-482d-91e8-3442f8bbdf67.jpg"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const [mainNews, ...secondaryNews] = newsData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main news card (left side) */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={mainNews.image_url} 
              alt={mainNews.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{mainNews.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{mainNews.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formatDate(mainNews.published)}</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-blue-600">{mainNews.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary news list (right side) */}
        <div className="lg:w-1/3 space-y-4">
          {secondaryNews.slice(0, 5).map((news, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{formatDate(news.published)}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-blue-600">{news.category}</span>
                  </div>
                </div>
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={news.image_url} 
                    alt={news.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
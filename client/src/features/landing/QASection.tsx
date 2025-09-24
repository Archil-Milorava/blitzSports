"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "რატომ არ გაქვთ სხვა კატეგორიები?",
      answer:
        "ამჟამად ვფოკუსირდებით მოცემულ კონტენტზე, მაგრამ გეგმაში გვაქვს სხვა კატეგორიების დამატება მომავალში.",
    },
    {
      question: "წერთ თუ არა ქართულ სპორტზე?",
      answer:
        "დიახ, ჩვენი გუნდი რეგულარულად აქვეყნებს მიმოხილვებს ქართული სპორტის მოვლენებზე, განსაკუთრებით ძიუდოსა და ჭიდაობაზე.",
    },
    {
      question: "ვინ წერს ისტორიებს და სიახლეებს?",
      answer:
        "ჩვენი კონტენტი იწერება პროფესიონალი სპორტული ჟურნალისტებისა და ექსპერტების მიერ.",
    },
    {
      question: "გაქვთ თუ არა მობილური აპლიცაცია?",
      answer:
        "ამჟამად ჩვენ ვმუშაობთ მობილური აპლიკაციის დეველოპმენტზე, რომელიც გამოვა მომავალი წლის დასაწყისში.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (


      <div className="bg-secondary my-10 rounded-lg shadow-md overflow-hidden">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className={` last:border-b-0 transition-colors ${
                isActive ? "bg-primary" : ""
              }`}
            >
              <button
                className="cursor-pointer w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-accent">
                  {faq.question}
                </h3>
                {isActive ? <ArrowUp /> : <ArrowDown />}
              </button>

              <div
                className={`px-6 overflow-hidden transition-max-height duration-300 ease-in-out  ${
                  isActive ? "max-h-40 py-2 bg-[#FFFCF1]" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 ">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
   
  );
};

export default FAQSection;

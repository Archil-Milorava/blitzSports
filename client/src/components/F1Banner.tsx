import Image from "next/image";
import Link from "next/link";

// Make sure this path is correct relative to your component
import MMa_BG_BIG from "../assets/f1-Bg-Big.png";

const F1Banner = () => {
  return (
    <div className="w-full h-80 md:h-[40rem] relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer mt-8">
      <Link href="/f1" className="block w-full h-full">
        <Image
          src={MMa_BG_BIG}
          alt="MMA Background"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          quality={90}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay with MMA text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
           <h2 className="text-primary text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider transform group-hover:scale-110 transition-transform duration-500">
              შემოაბიჯე f1 სამყაროში
            </h2>
        </div>
      </Link>
    </div>
  );
};

export default F1Banner;

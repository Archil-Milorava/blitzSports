import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Title = ({ title, to }: { title: string, to:string }) => {
  return (
    <Link href={to} className="group mt-10 mb-2 w-full border-b border-secondary flex items-center justify-between px-4 py-1.5  transition-colors duration-200 cursor-pointer">
      <h1 className="text-xl font-bold text-black tracking-widest">{title}</h1>
      <button className="text-sm flex gap-1 items-center transition-opacity duration-200 group-hover:text-secondary text-accent cursor-pointer">
        იხილეთ მეტი{" "}
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    </Link>
  );
};

export default Title;

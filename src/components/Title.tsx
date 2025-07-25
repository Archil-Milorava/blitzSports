import { ChevronRight } from "lucide-react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="group mt-10 mb-2 w-full border-b border-secondary flex items-center justify-between px-4 py-1.5  transition-colors duration-200 cursor-pointer">
      <h1 className="text-xl font-bold text-black tracking-widest">{title}</h1>
      <button className="text-sm flex gap-1 items-center transition-opacity duration-200 group-hover:text-secondary text-accent cursor-pointer">
        იხილეთ მეტი{" "}
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default Title;

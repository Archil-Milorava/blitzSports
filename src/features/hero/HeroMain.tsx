import Image from "next/image";
import BgImage from "../../assets/bgMain.png";
import BgImageSmall from "../../assets/bgMainSmall.png";

const HeroMain = () => {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-red-400">
      <Image
        src={BgImage}
        alt="background"
        className="absolute hidden sm:block  w-screen h-screen object-cover"
      />
      <Image
        src={BgImageSmall}
        alt="background"
        className="absolute block sm:hidden  w-screen h-screen object-cover"
      />
    </main>
  );
};

export default HeroMain;

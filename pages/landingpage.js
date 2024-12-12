import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FaTicketSimple } from "react-icons/fa6";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRouter } from "next/router"; // Import useRouter for navigation
import ParallaxImg from "../components/ParallaxImg";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  const router = useRouter(); // Initialize the router for navigation

  // Handle click to navigate to the index page ("/")
  const handleLaunchScheduleClick = () => {
    router.push("/"); // Redirect to the homepage (index.js)
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <FaTicketSimple className="text-3xl mix-blend-difference" />
      <button
        onClick={handleLaunchScheduleClick} // Trigger navigation on button click
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        Proceed to Mainsite <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize: "cover", // Makes the image fill the container
        backgroundPosition: "center 130%", // Centers horizontally and moves the image down vertically
        opacity,
        backgroundImage:
          "url(https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?cs=srgb&dl=pexels-thibault-trillet-44912-167636.jpg&fm=jpg)",
        backgroundRepeat: "no-repeat", // Prevents tiling
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://m.kedglobal.com/data/ked/image/2022/02/25/ked202202250019.jpg"
        alt="Blackpink Concert"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://assets.teenvogue.com/photos/64f0a106a683b28e919ea05c/16:9/w_2560%2Cc_limit/GettyImages-1604947670.jpg"
        alt="Taylor Swift"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://wp.dailybruin.com/images/2022/09/web.ae_.weekndreview.MC_.jpg"
        alt="The Weeknd"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://asianews.network/wp-content/uploads/bfi_thumb/20230927000881_0-7bogr16e51eqcag6r46vhanm8d1zub2ugjge8uh8u2o.jpeg"
        alt="Blackpink Concert"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Concert Schedules
      </motion.h1>
      <ScheduleItem title="BlackPink" date="Dec 9th" location="Japan" />
      <ScheduleItem title="TWICE" date="Dec 20th" location="Korea" />
      <ScheduleItem title="Bruno Mars" date="Jan 13th" location="Malaysia" />
      <ScheduleItem title="Justin Bieber" date="Feb 22nd" location="Thailand" />
      <ScheduleItem
        title="Katy Perry"
        date="Mar 1st"
        location="United Kingdom"
      />
      <ScheduleItem title="Alan Walker" date="Mar 8th" location="Africa" />
      <ScheduleItem title="Demi Lovato" date="Apr 8th" location="Mexico" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

export default SmoothScrollHero;

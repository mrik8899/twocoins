import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 200;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-primary-500 text-dark-900 shadow-xl hover:bg-primary-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    {/*  <span className="hidden sm:inline"></span> */}
    </button>
  );
};

export default BackToTopButton;
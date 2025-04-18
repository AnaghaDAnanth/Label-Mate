import { useEffect, useState } from "react";

function Title() {
  const [logoHovered, setIsHovered] = useState(false);
  const [showFullText, setShowFullText] = useState(true);

  useEffect(() => {
    let timeoutId;

    if (logoHovered) {
      setShowFullText(false);
    } else {
      timeoutId = setTimeout(() => {
        setShowFullText(true);
      }, 300); 
    }

    return () => clearTimeout(timeoutId);
  }, [logoHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[120px] h-8 relative"
    >
      <div
        className={`
          absolute top-1 left-0 flex items-center justify-center
          border border-amber-300 bg-[#ffde59] font-medium text-sm
          transition-all duration-500 ease-in-out
          rounded-full whitespace-nowrap
          ${logoHovered ? "w-8 h-8 translate-x-[-1px]" : "w-[100px] h-8 translate-x-0"}
        `}
      >
        {showFullText ? "Label Mate" : "lm"}
      </div>
    </div>
  );
}

export default Title;

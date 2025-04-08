import { useEffect, useRef } from "react";

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const resetPosition = () => {
      button.style.transform = "translate(0px, 0px)";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", resetPosition);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="relative px-6 py-3 text-white rounded-full bg-[#70CCE2] overflow-hidden transition-transform duration-300"
    >
      {children}
    </button>
  );
};

export default MagneticButton;

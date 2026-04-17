import { useEffect, useState } from "react";

const banners = [
  "We Build Scalable Web Apps 🚀",
  "Mobile Apps for Modern Business 📱",
  "End-to-End Digital Solutions 💡",
  "Launch Faster with DevCrew ⚡"
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 flex items-center justify-center bg-gradient-to-r from-green-500 to-yellow-400 text-black text-2xl font-bold text-center px-4">
      {banners[index]}
    </div>
  );
}

export default Hero;
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "finisher-header"; // Ensure the library is imported

function HomePage() {
  const headerRef = useRef(null);

  // Define conference details here
  const targetDate = "2026-08-20T09:00:00"; 
  const location = "Inday Teresing Auditorium, UV Main Campus, Cebu City";

  // Formatted Date String (e.g., "August 20, 2026")
  const displayDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(targetDate));

  // Countdown state variables
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 1. Initialize Finisher Header
    new window.FinisherHeader({
      count: 6,
      size: { min: 1100, max: 1300, pulse: 0 },
      speed: { x: { min: 0.1, max: 0.3 }, y: { min: 0.1, max: 0.3 } },
      colors: {
        background: "#0c9112", // Green theme background
        particles: ["#067218", "#085826", "#2d8b39"],
      },
      blending: "overlay",
      opacity: { center: 1, edge: 0.1 },
      skew: -2,
      shapes: ["c"],
    });

    // 2. Countdown Timer Logic
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleRegisterClick = () => {
    axios
      .get("http://localhost:8080")
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const categories = [
    { code: "B", name: "Business & Management" },
    { code: "E", name: "Education & Engineering" },
    { code: "A", name: "AI & Emerging Tech" },
    { code: "M", name: "Medical & Allied Health" },
    { code: "S", name: "Social Sciences & Humanities" },
  ];

  // Helper to ensure double digit numbers on countdown display
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section className="relative overflow-hidden">
      {/* Finisher Header Container */}
      <div className="finisher-header w-full h-[650px] flex items-center justify-center">
        <div className="text-center text-white px-6">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-4 text-outline-2 text-shadow--700">
      International Research Conference 2026
      </h1>
   

          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join us for a gathering of minds and ideas in the world of research.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/submit"
              className="rounded-md bg-white text-green-700 px-8 py-3 font-semibold hover:bg-gray-100 transition-all shadow-md"
            >
              Submit now
            </Link>
            <button
              onClick={handleRegisterClick}
              className="rounded-md bg-transparent border border-white text-white px-8 py-3 font-semibold hover:bg-white/20 transition-all"
            >
              Register
            </button>
          </div>


                 {/* Date and Location Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-lg font-medium text-green-100 mb-6">
            {/* Conference Date display */}
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {displayDate}
            </span>

            {/* Location display */}
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 max-w-xl text-center sm:text-left">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-300 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {location}
            </span>
          </div>

          {/* Countdown Block */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/20 shadow-lg">
            <p className="text-sm uppercase tracking-wider font-semibold mb-2 text-green-200">
              conference begins in
            </p>
            <div className="flex justify-center gap-4 text-2xl sm:text-3xl font-mono font-bold">
              <div className="flex flex-col items-center">
                <span>{formatNumber(timeLeft.days)}</span>
                <span className="text-[10px] uppercase tracking-normal font-sans font-normal opacity-75">Days</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{formatNumber(timeLeft.hours)}</span>
                <span className="text-[10px] uppercase tracking-normal font-sans font-normal opacity-75">Hrs</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{formatNumber(timeLeft.minutes)}</span>
                <span className="text-[10px] uppercase tracking-normal font-sans font-normal opacity-75">Mins</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{formatNumber(timeLeft.seconds)}</span>
                <span className="text-[10px] uppercase tracking-normal font-sans font-normal opacity-75">Secs</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Categories & Content Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-3xl mx-auto mb-16">
          {categories.map((cat) => (
            <div
              key={cat.code}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-green-500 transition-all text-left"
            >
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">
                {cat.code}
              </span>
              <span className="font-semibold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
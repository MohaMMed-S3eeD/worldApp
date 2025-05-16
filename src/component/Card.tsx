import type { Country } from "../utils";
import { FaCity, FaUsers, FaClock } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const Card = ({ key, country }: { key: string; country: Country }) => {
  if (country.name.common === "Israel") {
    console.log("💩💩💩");
    country.name.common = "💩💩💩";
    country.capital = "Free Palestine";
    country.population = 2;
    country.timezones = ["💩"];
    country.flags.png =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOKuun-RgXC3b3fsy8N3TwugTS4jQdLdHi9Q&s";
  }
  useGSAP(() => {
    const cards = document.querySelectorAll("#card");
    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 200 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            markers: false,
          },
          delay: index * 0.1, // تأخير بسيط بين كل كارد
        }
      );
    });

    gsap.fromTo(
      ".CCard h2,p",
      {
        opacity: 0,
        x: 200,
        duration: 1,
        ease: "power2.inOut",
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, []);
  return (
    <div
      id="card"
      className="flex justify-around mt-2 w-full gap-4 text-indigo-400 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 bg-white mb-2"
      key={key}
    >
      <div className="flex flex-col gap-6 font-medium CCard">
        <h2 className="flex text-2xl font-semibold justify-start text-indigo-600">
          {country.name.common}
        </h2>
        <div className="flex items-center gap-3">
          <FaCity className="text-indigo-500 text-xl" />
          <p className="text-gray-700">
            <span className="text-indigo-500 font-semibold">Capital:</span>{" "}
            {country.capital}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaUsers className="text-indigo-500 text-xl" />
          <p className="text-gray-700">
            <span className="text-indigo-500 font-semibold">Population:</span>{" "}
            {new Intl.NumberFormat().format(country.population)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaClock className="text-indigo-500 text-xl" />
          <p className="text-gray-700">
            <span className="text-indigo-500 font-semibold">Timezone:</span>{" "}
            {country.timezones[0]}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-1/1.5 h-1/1.5  rounded-2xl shadow-xl shadow-indigo-200 hover:transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
// Assets
import countImg from "../../../assets/images/counter-timer-img.png";
// Components
import { Link } from "react-router-dom";

const Counter = () => {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  let interval: NodeJS.Timer;

  const countDown = () => {
    const destination = new Date(2023, 3, 1).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = destination - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (destination < 0) {
        clearInterval(interval);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    countDown();
  }, []);

  return (
    <div className="flex justify-between">
      {/* Clock */}
      <div className="flex flex-col mx-auto items-center md:items-start gap-2 py-14">
        <h5 className="text-sm text-white">Limited Offers</h5>
        <h4 className="text-white font-semibold">Quality Armchair</h4>
        {/* clock */}
        <div className="flex gap-5 items-center my-4 font-semibold">
          <div className="flex flex-col gap-3 items-center">
            <span className="text-2xl text-white">{days}</span>
            <span className="text-sm text-white">Days</span>
          </div>
          <div className="text-white">:</div>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-2xl text-white">{hours}</span>
            <span className="text-sm text-white">Hours</span>
          </div>
          <div className="text-white">:</div>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-2xl text-white">{minutes}</span>
            <span className="text-sm text-white">Minutes</span>
          </div>
          <div className="text-white">:</div>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-2xl text-white">{seconds}</span>
            <span className="text-sm text-white">Seconds</span>
          </div>
        </div>
        {/* Button */}
        <div>
          <Link
            to="/shop"
            className="inline-block py-2 px-4 mt-4 rounded font-medium text-black bg-white"
          >
            Visit Shop
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="hidden md:block">
        <img src={countImg} alt="" />
      </div>
    </div>
  );
};

export default Counter;

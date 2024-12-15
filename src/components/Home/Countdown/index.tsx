import React from "react";
import { getCountdown } from "@/sanity/sanity-shop-utils";
import { Countdown } from "@/types/countdown";
import CountdownBanner from "./CountdownBanner";

const CountDown = async () => {
  const countdown: Countdown = await getCountdown();

  return <div>{countdown && <CountdownBanner data={countdown} />}</div>;
};

export default CountDown;

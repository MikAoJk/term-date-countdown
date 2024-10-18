'use client';

import React, {useState} from 'react';

interface CountdownProps {
    date: string;
}

export const Countdown = ({date}: CountdownProps) => {
    const parsedDate = Date.parse(date);

    const [secondsLeft, setSecondsLeft] = useState(parsedDate)

    setInterval(() => {
        const tempCountdownDate: number | null = calculateCountdown(secondsLeft);
        tempCountdownDate && setSecondsLeft(tempCountdownDate);
    }, 0);

    const {days, hours, min, sec} = timeLeft(secondsLeft);

    return (
        <div className="m-auto pb-5">
        <span className="inline-block text-xl md:inline-block md:text-5xl">
           <span className="m-2 flex flex-col text-center md:m-5">
              <strong>{addLeadingZeros(days)}</strong>
              <span>{days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

            <span className="inline-block text-xl md:inline-block md:text-5xl">
          <span className="m-2 flex flex-col text-center md:m-5">
            <strong>{addLeadingZeros(hours)}</strong>
            <span>Hours</span>
          </span>
        </span>

            <span className="inline-block text-xl md:inline-block md:text-5xl">
         <span className="m-2 flex flex-col text-center md:m-5">
            <strong>{addLeadingZeros(min)}</strong>
            <span>Min</span>
          </span>
        </span>

            <span className="inline-block text-xl md:inline-block md:text-5xl">
         <span className="m-2 flex flex-col text-center md:m-5">
            <strong>{addLeadingZeros(Math.floor(sec))}</strong>
            <span>Sec</span>
          </span>
        </span>
        </div>
    );

}

interface CalculatedTimeLeft {
    sec: number;
    hours: number;
    min: number;
    days: number;
    years: number
}

const timeLeft = (seconds: number) => {
    const timeLeft: CalculatedTimeLeft = {
        years: 0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0
    };

    if (seconds >= (365.25 * 86400)) {
        timeLeft.years = Math.floor(seconds / (365.25 * 86400));
        seconds -= timeLeft.years * 365.25 * 86400;
    }
    if (seconds >= 86400) {
        timeLeft.days = Math.floor(seconds / 86400);
        seconds -= timeLeft.days * 86400;
    }
    if (seconds >= 3600) {
        timeLeft.hours = Math.floor(seconds / 3600);
        seconds -= timeLeft.hours * 3600;
    }
    if (seconds >= 60) {
        timeLeft.min = Math.floor(seconds / 60);
        seconds -= timeLeft.min * 60;
    }
    timeLeft.sec = seconds;

    // TODO find out why year is 52082, when countdown time i passed
    if (timeLeft.years === 52082 || timeLeft.days == 146) {
        return setTimeleftToZero(timeLeft)
    }

    return timeLeft;
}

const setTimeleftToZero = (timeLeft: CalculatedTimeLeft) => {
    timeLeft.years = 0
    timeLeft.hours = 0
    timeLeft.days = 0
    timeLeft.sec = 0
    return timeLeft;
}

const addLeadingZeros = (value: number) => {
    const stringValue = String(value);
    return stringValue.length < 2 ? '0' + stringValue : stringValue;
}

const calculateCountdown = (secondsLeft: number | null) => {
    if (!secondsLeft) return null

    const diff = (secondsLeft - new Date().getTime()) / 1000;

    if (diff <= 0) return null;

    return diff;
}

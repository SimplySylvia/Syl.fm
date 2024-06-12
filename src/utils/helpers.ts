import axios from "axios";
import { TrackInfo } from "@/typings/trackInfo";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "An error occurred";
};

export const timeFormat = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedMinutes}:${formattedSeconds}`;
};

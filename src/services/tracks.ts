import axios from "axios";
import { TrackInfo } from "@/typings/trackInfo";
import { getErrorMessage } from "@/utils/helpers";
import { ROOT_URL_V1 } from "@/constants";

export const getTrackInfo = async (): Promise<{
  success: boolean;
  message: string;
  track: TrackInfo;
}> => {
  try {
    const response: { data: TrackInfo } = await axios.get(`${ROOT_URL_V1}/track-info`);

    return {
      success: true,
      message: "Track info fetched successfully",
      track: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
      track: {
        title: "",
        duration: 0,
        image: "",
        difference_in_seconds: 0,
        started_at: 0,
        time: "",
      },
    };
  }
};

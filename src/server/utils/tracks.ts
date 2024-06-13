import axios from "axios";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

export const downloadFileFromGoogleDrive = async (
  fileUrl: string,
  destinationFile: string
): Promise<any> => {
  try {
    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    const totalSize = response.headers["content-length"];
    let downloadedSize = 0;
    let previousProgress = 0;

    if (!fs.existsSync(destinationFile)) {
      console.log("File does not exist, creating new file");
      fs.writeFileSync(destinationFile, "");
    }

    const writer = fs.createWriteStream(destinationFile);

    response.data.pipe(writer);

    response.data.on("data", (chunk: Buffer): void => {
      downloadedSize += chunk.length;
      const progress = Math.round((downloadedSize / totalSize) * 100);

      if (progress !== previousProgress) {
        previousProgress = progress;
        process.stdout.write(`\rDownloading file: ${progress}%`);
      }
    });

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(err);
    return new Error("Error while downloading file from Google Drive");
  }
};

export const getGistFileContent = async (gistId: string, fileName: string): Promise<string> => {
  try {
    const response = await axios.get(`https://api.github.com/gists/${gistId}`);
    const files = response.data.files;
    return files[fileName].content;
  } catch (err) {
    console.error(err);
    return "Error while fetching gist file content";
  }
};

export const getTrackDuration = (trackPath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(trackPath, (err, metadata) => {
      if (err) {
        console.error(err.message || "Error while getting track duration");
        reject(err);
      }

      const trackDuration = metadata.format.duration;
      const duration = trackDuration ? Math.floor(trackDuration) : 0;
      resolve(duration);
    });
  });
};

export const exitHandler = (message = ""): never => {
  console.log(message);
  process.exit(1);
};

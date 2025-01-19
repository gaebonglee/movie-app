import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const APIKEY = process.env.OMDB_API_KEY;
console.log("🔹 Loaded API Key:", APIKEY);

export default async function handler(request, response) {
  try {
    console.log("🔹 API 요청 시작:", request.body);

    const { title, page, id } = request.body;
    if (!title && !id) {
      console.error("🔴 오류: 필요한 매개변수가 없습니다.");
      return response
        .status(400)
        .json({ error: "Missing required parameters" });
    }

    const url = id
      ? `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`
      : `https://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&page=${page}`;

    const res = await fetch(url);
    const text = await res.text(); // 응답을 먼저 텍스트로 받기

    if (!text) {
      console.error("🔴 오류: OMDB API에서 빈 응답을 받았습니다.");
      return response
        .status(500)
        .json({ error: "Empty response from OMDB API" });
    }

    const json = JSON.parse(text); // JSON 변환

    if (json.Error) {
      console.error("🔴 OMDB API 오류:", json.Error);
      return response.status(500).json({ error: json.Error });
    }

    console.log("🔹 API 응답 성공:", json);
    response.status(200).json(json);
  } catch (err) {
    console.error("🔴 API Fetch Error:", err);
    response.status(500).json({ error: err.message || "Failed to fetch data" });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { chat } from "@/libs/openai";
import axios from "axios";

interface ChatRequest extends NextApiRequest {
  body: {
    prompt: string;
    messages: ChatMessage[];
  };
}

type Data = {
  status: boolean;
  message?: string;
  data?: {
    message: ChatMessage[];
  };
};

export default async function handler(
  req: ChatRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: prompt,
        n: 1,
        size: "512x512",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "User-Agent": "Chrome",
        },
      }
    );

    // Handle the response here
    console.log(response.data);

    res.status(200).json({
      status: true,
      data: response.data,
    });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(500).json({
        status: false,
        message: error.response.data,
      });
    } else {
      console.log(error.message);
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

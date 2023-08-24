// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  photo?: string | object;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: `${req.method} not allowed!` });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/kandinsky-community/kandinsky-2-1",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );
    const output = await response.json();
    console.log({ response });

    return res.status(200).json({ photo: output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

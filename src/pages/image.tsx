import { lazy, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import Content from "@/components/chat/Content";
import Footer from "@/components/chat/Footer";
import ReactTextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import Layout from "@/components/Layout";
import Back from "@/components/Back";

const ImageGenerator = () => {
  let [imageUrl, setImageUrl] = useState("");
  let inputRef = useRef(null);
  let [loading, setLoading] = useState(false);

  let imageGenerator = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputRef.current.value === "") {
        return 0;
      }
      let prompt = inputRef.current.value;
      setLoading(true);
      inputRef.current.value = "";
      axios
        .post("/api/image", {
          prompt: prompt,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data?.data?.data[0]?.url);
          setImageUrl(data?.data?.data[0]?.url);

          setLoading(false);
        });
    }
  };
  return (
    <Layout title="image">
      <Back />
      <div className="flex flex-1 flex-col items-center my-16">
        <Image
          src="https://ai.ls/assets/openai-logos/SVGs/openai-white-lockup.svg"
          alt=""
          height={200}
          width={400}
        />
        <h1 className="text-2xl font-bold mt-10">Generate Image</h1>
      </div>

      <div className="flex justify-center items-center">
        {imageUrl && (
          <Image
            width={512}
            loading={"lazy"}
            height={512}
            className="w-[512px] h-[512px] rounded-xl"
            src={imageUrl}
            alt=""
          />
        )}
      </div>
      <Footer>
        <div className="mt-1 relative rounded-md shadow-sm">
          <ReactTextareaAutosize
            ref={inputRef}
            rows={1}
            name="comment"
            //   onSubmit={imageGenerator}
            id="comment"
            onKeyDown={imageGenerator}
            className="px-4 py-3 bg-accents-1 focus:outline-none block w-full text-white rounded-md resize-none"
            placeholder="Type what you want to generate..."
            defaultValue={""}
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </Footer>
    </Layout>
  );
};

export default ImageGenerator;

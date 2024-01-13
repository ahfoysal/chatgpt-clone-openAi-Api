"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className=" left-5 top-5 h-8 w-8 absolute "
    >
      <ArrowLeftIcon className="h-8 w-8 z-10 text-white" />
    </button>
  );
};

export default Back;

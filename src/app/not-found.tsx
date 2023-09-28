import Link from "next/link";
import Image from "next/image";
import img from "../assets/notfound.jpg";

export default function NotFound() {
  return (
    <div className="h-full grid place-items-center">
      <div className="flex w-full h-[80%] items-center justify-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl text-slate-800 font-bold">Not Found! 404</h2>
          <p className="text-md text-slate-700 font-medium">
            <span>Could not find requested resource&nbsp;</span>
            <Link href="/" className="text-red-500 hover:underline" replace>
              Return Home
            </Link>
          </p>
        </div>
        <div className="w-[35%] h-[70%]">
          <Image
            src={img}
            alt="not found"
            height={1000}
            width={1000}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

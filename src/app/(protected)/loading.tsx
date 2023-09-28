import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center gap-2 justify-center text-2xl">
      <span>Loading...</span>
      <ClipLoader size={"3rem"} color="#36d7b7" />
    </div>
  );
}

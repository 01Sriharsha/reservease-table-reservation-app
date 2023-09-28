import React from "react";
import SignupForm from "./_components/SignupForm";
import Image from "next/image";
import BgImage from "@/assets/bg.jpg";
import prisma from "@/lib/PrismaClient";

export default async function SignupPage() {

  const locations = await prisma.location.findMany();

  if(!locations){
    console.log("sign up form: Failed to fetch locations");
  }
  return (
    <div className="w-full h-fit overflow-y-auto  flex justify-center py-4 bg-blue-100">
      <div className="relative w-[80vw] h-full md:h-[29rem] flex items-center">
        <Image
          src={BgImage}
          alt="bg-image"
          height={1000}
          width={1000}
          className="w-[60%] h-full hidden md:block" 
        />
        <div className="w-full md:absolute md:right-0  md:w-[50%] overflow-y-auto">
          <SignupForm locations={locations} />
        </div>
      </div>
    </div>
  );
}

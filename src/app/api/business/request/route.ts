import prisma from "@/lib/PrismaClient";
import validateObject from "@/utils/validateObject";
import { NextRequest, NextResponse } from "next/server";

interface RequestData {
  name: string;
  rrn: string;
  city: string;
  address: string;
  phone: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: `Unauthorized request!!` },
      { status: 401 }
    );
  }

  const body: RequestData = await req.json();

  const { name, rrn, city, address, phone, email } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  if (rrn.length !== 15) {
    return NextResponse.json(
      { error: `GST.No should be 15 characters only!!` },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "User not found!!" }, { status: 400 });
  }

  const alreadyExist = await prisma.businessRequest.findFirst({
    where: { userId: user.id },
  });

  if (alreadyExist) {
    return NextResponse.json(
      {
        error:
          "You have already made a request!!Soon your request will be validated!",
      },
      { status: 400 }
    );
  }

  const request = await prisma.businessRequest.create({
    data: {
      restaurant_name: name,
      restaurant_city: city,
      restaurant_address: address,
      restaurant_phone: phone,
      restaurant_rrn: rrn,
      userId: user.id,
    },
  });

  return NextResponse.json(
    { message: "Requested successfully!!", request },
    { status: 201 }
  );
}

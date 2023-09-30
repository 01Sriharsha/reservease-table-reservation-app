import prisma from "@/lib/PrismaClient";
import { generateSlug } from "@/utils/generateSlug";
import validateObject from "@/utils/validateObject";
import { BusinessRequest, STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  email: string;
  status: STATUS;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return NextResponse.json(
      { error: `Unauthorized request` },
      { status: 401 }
    );
  }
  const body: RequestBody = await req.json();

  const { email, status } = body;

  const id = parseInt(params.id);

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty` },
      { status: 400 }
    );
  }

  // //Parallel processing
  // const userPromise = prisma.user.findUnique({ where: { email } });
  // const requestPromise = prisma.businessRequest.findUnique({
  //   where: { request_id: id },
  // });

  // const [user , request] = await Promise.all([userPromise , requestPromise])

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return NextResponse.json({ error: `User not found!!` }, { status: 400 });

  if (user.role === "OWNER")
    return NextResponse.json(
      { error: `Already a owner of a restaurant!!` },
      { status: 400 }
    );

  const request = await prisma.businessRequest.findUnique({
    where: { request_id: id },
  });

  if (!request) {
    return NextResponse.json(
      { error: `Business Request not found!!` },
      { status: 400 }
    );
  }

  if (request.status !== "PENDING") {
    return NextResponse.json(
      { error: `Request has already been ${request.status}!!` },
      { status: 400 }
    );
  }

  if (status !== STATUS.APPROVED) {
    try {
      await prisma.businessRequest.update({
        where: { request_id: id },
        data: { status: "REJECTED" },
      });
    } catch (error) {
      return NextResponse.json(
        { error: `Failed to reject the request!!` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Request rejected successfully!!` },
      { status: 400 }
    );
  }

  //generate a slug
  //save location if it doesn't exist already in db
  //store info to restaurant and update it
  //assign owner role to the user

  const slug = await generateUniqueSlug(request);

  let city_id: number;

  const location = await prisma.location.findFirst({
    where: { name: request.restaurant_city },
  });

  if (!location) {
    const city = await prisma.location.create({
      data: { name: request.restaurant_city },
      select: { id: true },
    });
    city_id = city.id;
  } else {
    city_id = location.id;
  }

  try {
    await prisma.restaurant.create({
      data: {
        name: request.restaurant_name,
        address: request.restaurant_address,
        rrn: request.restaurant_rrn,
        location_id: city_id,
        phone: request.restaurant_phone,
        ownerId: user.id,
        slug: slug,
        close_time: "",
        cuisine_id: 1, //Indian
        description: "",
        main_image: "",
        open_time: "",
        images: [],
        price: "CHEAP",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to create a restaurant!!` },
      { status: 400 }
    );
  }

  try {
    await prisma.user.update({
      where: { email },
      data: { role: "OWNER" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to assign the role to the user!!` },
      { status: 400 }
    );
  }

  try {
    await prisma.businessRequest.update({
      where: { request_id: id },
      data: { status: "APPROVED" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to approve the request!!` },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Request approved and assigned successfully!!` },
    { status: 201 }
  );
}

async function generateUniqueSlug(request: BusinessRequest) {
  let slug = generateSlug(
    `${request.restaurant_name} ${request.restaurant_city}`
  );

  let isUnique = false;

  while (!isUnique) {
    const restaurant = await prisma.restaurant.findFirst({ where: { slug } });
    if (restaurant) {
      slug = generateSlug(
        `
          ${request.restaurant_name} 
          ${request.restaurant_city} 
          ${new Date().getDate()}
        `
      );
    } else {
      isUnique = true;
      break;
    }
  }

  return slug;
}

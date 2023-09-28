import prisma from "@/lib/PrismaClient";
import GenerateTimeStamp from "@/utils/GenerateTimeStamp";
import validateObject from "@/utils/validateObject";
import { NextRequest, NextResponse } from "next/server";

interface RestuarantData {
  name: string;
  description: string;
  address: string;
  phone: string;
  city: string;
  open_time: string;
  close_time: string;
  cuisine: string;
  main_image: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized request!!" },
      { status: 401 }
    );
  }

  const body: RestuarantData = await req.json();

  const { slug } = params;

  const timestamps = GenerateTimeStamp();

  const {
    name,
    description,
    address,
    phone,
    city,
    open_time,
    close_time,
    cuisine: cuisine_name,
    main_image,
  } = body;

  const obj = validateObject(body);

  if (obj.error) {
    return NextResponse.json(
      { error: `${obj.key} cannot be empty!!` },
      { status: 400 }
    );
  }

  //10:30 to 10:30:00.000Z
  const openTime = timestamps.filter((t) => {
    console.log(t.label);
    console.log(open_time);

    return t.label === open_time;
  })[0].value;
  const closeTime = timestamps.filter((t) => t.label === close_time)[0].value;

  console.log(openTime, " ", closeTime);

  const locationPromise = prisma.location.findFirst({
    where: { name: city },
  });

  const cuisinePromise = prisma.cuisine.findFirst({
    where: { name: cuisine_name },
  });

  const [location, cuisine] = await Promise.all([
    locationPromise,
    cuisinePromise,
  ]);

  if (!location) {
    return NextResponse.json(
      { error: "Location not found!!" },
      { status: 400 }
    );
  }

  if (!cuisine) {
    return NextResponse.json({ error: "Cuisine not found!!" }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.update({
    where: { slug },
    data: {
      name: name.toLowerCase(),
      description: description.toLowerCase(),
      open_time: `${openTime}:00.000Z`,
      close_time: `${closeTime}:00.000Z`,
      address: address.toLowerCase(),
      phone: phone.toLowerCase(),
      main_image,
      location_id: location.id,
      cuisine_id: cuisine.id,
    },
    select: {
      name: true,
      description: true,
      address: true,
      main_image: true,
      open_time: true,
      close_time: true,
      phone: true,
      location: { select: { name: true } },
      cuisine: { select: { name: true } },
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { error: "Failed to update restaurant details!!" },
      { status: 400 }
    );
  }

  const response_obj = {
    ...restaurant,
    //10:30:00.000Z to 10:30
    open_time: timestamps.filter(
      (t) => t?.value === restaurant.open_time.substring(0, 5)
    )[0]?.label,
    close_time: timestamps.filter(
      (t) => t?.value === restaurant.close_time.substring(0, 5)
    )[0]?.label,
    city: restaurant.location.name,
    cuisine: restaurant.cuisine.name,
    image: restaurant.main_image,
  };

  return NextResponse.json(
    { message: "Restaurant details updated successfully!!", ...response_obj },
    { status: 201 }
  );
}

import { ROLE } from "@prisma/client";

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  id?:number;
  email: string;
  password: string;
  phone: string;
  city: string;
  first_name: string;
  last_name: string;
  role?: ROLE;
  restaurant_slug?:string
  image?:string
};

interface BookingData {
  bookerFirstName: string;
  bookerLastName: string;
  bookerEmail: string;
  bookerPhone: string;
  bookerCity: string;
  request?: string;
  occassion?: string;
}
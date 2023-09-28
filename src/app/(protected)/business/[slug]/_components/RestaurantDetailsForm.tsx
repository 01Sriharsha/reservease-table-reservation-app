"use client";

import GenerateTimeStamp from "@/utils/GenerateTimeStamp";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Img from "../../../../../assets/img-placehoder.png";
import { Cuisine, Location, PRICE } from "@prisma/client";
import { apiClient } from "@/utils/axios";
import { toast } from "react-toastify";
import { TOAST_PROP } from "@/context/Provider";
import InputElement from "./formComponents/InputElement";
import SelectElement from "./formComponents/SelectElement";

interface RestaurantDetailsFormProps {
  restaurant: {
    name: string;
    slug: string;
    description: string;
    open_time: string;
    close_time: string;
    main_image: string;
    address: string;
    phone: string;
    price: PRICE;
    location: {
      name: string;
    };
    cuisine: {
      name: string;
    };
  };
  locations: Location[];
  cuisines: Cuisine[];
}

export default function RestaurantDetailsForm({
  restaurant,
  locations,
  cuisines,
}: RestaurantDetailsFormProps) {
  const timestamps = GenerateTimeStamp();

  const [input, setInput] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    city: "",
    open_time: "",
    close_time: "",
    cuisine: "",
    price: "",
  });

  const [image, setImage] = useState("");

  const [otherCity, setOtherCity] = useState(false);

  useEffect(() => {
    const {
      name,
      description,
      open_time,
      close_time,
      main_image,
      location,
      cuisine,
      phone,
      address,
      price,
    } = restaurant;

    const openTime =
      timestamps.filter((time) => open_time.substring(0, 5) === time.value)[0]
        ?.label || "";
    const closeTime =
      timestamps.filter((time) => close_time.substring(0, 5) === time.value)[0]
        ?.label || "";

    setInput((prev) => ({
      ...prev,
      name,
      description,
      phone,
      address,
      price,
      open_time: openTime,
      close_time: closeTime,
      city: location.name,
      cuisine: cuisine.name,
    }));
    setImage(main_image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]);

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageString = e.target?.result?.toString() || "";
      setImage(imageString);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const restuarantData = { ...input, main_image: image };
    toast
      .promise(
        apiClient.post(
          `/restaurant/${restaurant.slug}/manage/edit`,
          restuarantData
        ),
        { pending: "Updating details...." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        setInput((prev) => ({ ...prev, ...res.data }));
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to update restuarant details!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="container mx-auto p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Restuarant Details: </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <InputElement
            type="text"
            name="name"
            value={input.name}
            handleChange={handleChange}
          />

          <InputElement
            type="number"
            name="phone"
            value={input.phone}
            handleChange={handleChange}
          />

          <InputElement
            type="text"
            name="address"
            value={input.address}
            handleChange={handleChange}
          />

          <div className="flex flex-col">
            {otherCity ? (
              <InputElement
                type="text"
                name="city"
                value={input.city}
                handleChange={handleChange}
              />
            ) : (
              <SelectElement
                name="city"
                value={input.city}
                handleChange={handleChange}
                array={locations}
              />
            )}
            <div className="flex gap-2 items-center mt-1">
              <input
                type="checkbox"
                onChange={() => setOtherCity(!otherCity)}
              />
              <p className="text-xs text-slate-500">
                check here to enter your city
              </p>
            </div>
          </div>

          <SelectElement
            name="open_time"
            value={input.open_time}
            handleChange={handleChange}
            array={timestamps}
          />
          <SelectElement
            name="close_time"
            value={input.close_time}
            handleChange={handleChange}
            array={timestamps}
          />
          <SelectElement
            name="cuisine"
            value={input.cuisine}
            handleChange={handleChange}
            array={cuisines}
          />
          <SelectElement
            name="price"
            value={input.price}
            handleChange={handleChange}
            array={[
              { name: PRICE.CHEAP },
              { name: PRICE.REGULAR },
              { name: PRICE.EXPENSIVE },
            ]}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full my-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={handleChange}
            className="border border-neutral-400 hover:border-black focus:outline-none p-2 mt-2 w-full"
          />
        </div>

        {/* Main Image Upload */}
        <div className="w-full">
          <div className="w-[100%] md:w-[65%] lg:[50%]">
            <Image
              src={image || Img}
              alt={"image pic"}
              width={1000}
              height={1000}
              className="border w-full h-[18rem] border-neutral-400 my-2 object-fill cursor-pointer"
              onClick={() => setImage("")}
            />
            {image && (
              <p className="text-neutral-500 text-xs">
                *click on image to remove it
              </p>
            )}

            <div className="w-full my-4">
              <label
                role="button"
                htmlFor={"image"}
                className={`p-3 w-full flex items-center justify-center gap-3 border border-neutral-400 hover:border-black rounded-md ${
                  image && "cursor-not-allowed"
                }`}
              >
                <AiOutlineUpload size={"1.3rem"} className="text-slate-700" />
                <span>Upload Image</span>
              </label>

              <input
                id="image"
                type="file"
                onChange={handleMainImage}
                placeholder="Choose File"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-slate-800 text-white hover:bg-white hover:border-black border hover:text-slate-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
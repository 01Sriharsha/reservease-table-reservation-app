"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import InputElement from "./formComponents/InputElement";
import { apiClient } from "@/utils/axios";
import { toast } from "react-toastify";
import { TOAST_PROP } from "@/context/Provider";
import { Item } from "@prisma/client";
import validateObject from "@/utils/validateObject";
import useAuth from "@/hooks/useAuth";
import MenuCard from "./MenuCard";

interface MenuDetailsFormProps {
  restaurant: {
    slug: string;
    name: string;
    items: Item[];
  };
}

const MenuDetailsForm: React.FC<MenuDetailsFormProps> = ({ restaurant }) => {
  const { data } = useAuth();

  const [input, setInput] = useState({
    item: "",
    description: "",
    price: "",
  });

  const [items, setItems] = useState(restaurant.items);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = validateObject(input);
    if (obj.error) {
      toast.error(`${obj.key} cannot be empty!!`, TOAST_PROP);
      return;
    }
    toast
      .promise(
        apiClient.post(`/restaurant/${restaurant.slug}/manage/menu/add`, {
          ...input,
        }),
        { pending: "Adding item..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        setItems((prev) => [...prev, res.data]);
        handleReset();
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error
            ? err.response?.data?.error
            : "Failed to add item to the menu!!",
          TOAST_PROP
        );
      });
  };

  const handleReset = () => setInput({ item: "", description: "", price: "" });

  const handleDeleteItem = (id: number) => {
    toast
      .promise(
        apiClient.delete(
          `/restaurant/${restaurant.slug}/manage/menu/delete/${id}`
        ),
        { pending: "Removing ietms..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        setItems((prev) => prev.filter((i) => i.id !== id));
      });
  };

  if (!data) {
    return <div>Login to edit the menu!!</div>;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full grid place-items-center my-2"
      >
        <div className="flex flex-col gap-3 w-full md:w-[75%] justify-center">
          <h2 className="text-2xl text-slate-800 font-semibold capitalize">
            Add items to restuarant menu:{" "}
          </h2>
          <InputElement
            name="item"
            value={input.item}
            handleChange={handleChange}
            type="text"
          />

          <InputElement
            name="price"
            value={input.price}
            handleChange={handleChange}
            type="number"
          />

          <InputElement
            name="description"
            value={input.description}
            handleChange={handleChange}
            type="text"
          />

          <button className="px-4 py-2 mt-4 bg-slate-700 text-white border hover:border-black hover:bg-white hover:text-black transition">
            Save
          </button>
        </div>
      </form>
      <div className="w-full my-4">
        <h2 className="text-2xl text-slate-800 font-semibold">
          Added Menu Items:
        </h2>
        {items.length !== 0 ? (
          <div className=" h-full grid grid-cols-1 md:grid-cols-2 gap-2 my-3">
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                handleDeleteItem={handleDeleteItem}
                data={data}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h2 className="text-xl ">No items added!!</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuDetailsForm;

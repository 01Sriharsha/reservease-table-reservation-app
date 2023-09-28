import { TOAST_PROP } from "@/context/Provider";
import useAuth from "@/hooks/useAuth";
import { cities } from "@/lib/data";
import { apiClient } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function BusinessRequestForm() {
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useAuth();

  const router = useRouter();

  const [input, setInput] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    gst: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.gst.length !== 15) {
      toast.error("GST.No should be 15 characters only!!", TOAST_PROP);
      return;
    }

    const email = data?.email;
    toast
      .promise(
        apiClient.post(`/business/request`, { ...input, email }),
        { pending: "Requesting...." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        handleReset();
        router.replace("/");
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to submit the data!!Try again later",
          TOAST_PROP
        );
      });
  };

  const handleReset = () =>
    setInput({ name: "", city: "", gst: "", phone: "", address: "" });

  return (
    <div ref={ref} className="flex justify-center items-center p-5">
      <form
        className="w-[800px] px-6 py-3 shadow-slate-400 shadow-lg rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <div className="my-3">
          <h2 className="text-3xl font-semibold text-center">
            Tell us about your restaurant business
          </h2>
          <p className="text-center text-sm my-2">
            Fill out the form below and a member of our team will contact you
            shortly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name">
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={input.name}
              onChange={handleChange}
              className="w-full p-2 border border-neutral-400 focus:border-black hover:border-black focus:outline-none my-3 transition rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="gst">
              Restaurant GST.No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="gst"
              id="gst"
              value={input.gst}
              onChange={handleChange}
              className="w-full p-2 border border-neutral-400 focus:border-black hover:border-black focus:outline-none my-3 transition rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="city">
              Located City <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              id="city"
              value={input.city}
              onChange={handleChange}
              className="w-full p-2 border border-neutral-400 focus:border-black hover:border-black focus:outline-none transition my-3 rounded-md capitalize text-center"
              required
            >
              <option hidden>{input.city || "--select location--"}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="phone">
              Restaurant contact.No <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={input.phone}
              onChange={handleChange}
              className="w-full p-2 border border-neutral-400 focus:border-black hover:border-black focus:outline-none transition my-3 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address">
            Restaurant Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            id="address"
            value={input.address}
            onChange={handleChange}
            className="w-full p-2 border border-neutral-400 focus:border-black hover:border-black focus:outline-none transition my-3 rounded-md"
            required
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleReset}
            className="p-2 border text-white bg-black transition  mt-4 mb-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="p-2 border text-white bg-red-500 transition hover:border-black hover:bg-white hover:text-black mt-4 mb-2"
          >
            Submit
          </button>
        </div>

        <p className="text-sm">
          <span className="text-red-500">*</span> By clicking Submit you agree
          to our Privacy Policy.
        </p>
      </form>
    </div>
  );
}

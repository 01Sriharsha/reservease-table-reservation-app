"use client";

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/axios";
import { TOAST_PROP } from "@/context/Provider";
import { useRouter } from "next/navigation";

interface GalleryFormProps {
  images: string[];
  slug: string;
}

const GalleryForm: FC<GalleryFormProps> = ({
  images: restaurant_images,
  slug,
}: GalleryFormProps) => {
  const [images, setImages] = useState<string[]>(restaurant_images);

  const router = useRouter();

  useEffect(() => {
    setImages([...images]);
  }, [slug]);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList || fileList?.length <= 0) return;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const imgString = e.target?.result?.toString();
        setImages((prev) => [...prev, imgString!]);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(
        apiClient.post(`/restaurant/${slug}/manage/gallery`, { images }),
        { pending: "Uploading..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message, TOAST_PROP);
        router.refresh();
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to upload images!!",
          TOAST_PROP
        );
      });
  };

  return (
    <div className="w-full md:w-[90%] my-5 m-auto">
      {images.length === 0 ? (
        <h2 className="text=2xl text-slate-700 font-bold my-2">
          No images added!! Upload images!
        </h2>
      ) : (
        <>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="w-60 h-50 border border-neutral-200 shadow-lg"
              >
                <Image
                  src={img}
                  alt={"image" + i}
                  height={1000}
                  width={1000}
                  className="w-full h-full object-fill rounded-md cursor-pointer"
                  onClick={() =>
                    setImages((prev) => prev.filter((i) => i !== img))
                  }
                />
              </div>
            ))}
          </div>
          <p className="text-neutral-400 text-sm mt-4">
            *click on the image to remove it
          </p>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="w-full md:w-[50%] my-4">
          <label
            role="button"
            htmlFor={"image"}
            className={`p-3 w-full flex items-center justify-center gap-3 border border-neutral-400 hover:border-black rounded-md`}
          >
            <AiOutlineUpload size={"1.3rem"} className="text-slate-700" />
            <span>Upload Images</span>
          </label>

          <input
            id="image"
            type="file"
            onChange={handleImages}
            placeholder="Choose File"
            className="hidden"
            multiple
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-slate-700 text-white border hover:bg-white hover:text-black hover:border-black transition my-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default GalleryForm;

import { TOAST_PROP } from "@/context/Provider";
import { apiClient } from "@/utils/axios";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface ReplyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  slug: string;
  id: number;
}

const ReplyModal: FC<ReplyModalProps> = ({
  open,
  setOpen,
  username,
  slug,
  id,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const [reply, setReply] = useState("");

  const handleClose = () => {
    ref.current?.close();
    setOpen(false);
  };

  const handleOpen = () => {
    ref.current?.showModal();
  };

  useEffect(() => {
    open ? handleOpen() : handleClose();
  }, [open]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(
        apiClient.post(`/restaurant/${slug}/review/replyReview/${id}`, {
          reply,
        }),
        { pending: "Replying..." },
        TOAST_PROP
      )
      .then((res) => {
        toast.success(res.data.message , TOAST_PROP);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error
            ? err.response.data.error
            : "Failed to reply!!",
          TOAST_PROP
        );
      });
  };

  return (
    <dialog
      ref={ref}
      className={`w-full md:w-[400px] h-[45%] bg-white
       backdrop:bg-slate-900/10 rounded-lg shadow-xl border border-neutral-200 transition-all ease-in-out duration-200 ${
         open ? "scale-100" : "scale-50"
       }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center px-2">
          <h1 className="capitalize text-xl text-slate-800 font-bold my-3">
            Reply to {username}:{" "}
          </h1>
          <BsXCircleFill
            role="button"
            size={"1.3rem"}
            color="red"
            onClick={handleClose}
          />
        </div>
        <textarea
          placeholder="Reply here..."
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full border border-neutral-400 hover:border-black rounded-md p-2 focus:outline-none my-3"
        />

        <button className="bg-slate-700 text-white py-2 px-4 border hover:border-black hover:text-black hover:bg-white transition">
          Submit
        </button>
      </form>
    </dialog>
  );
};

export default ReplyModal;

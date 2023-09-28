import { randomUUID } from "crypto";

export const generateReferenceNo = () => {
  const date = new Date();

  const str =
    date.getDate().toString() +
    date.getFullYear().toString() +
    randomUUID().toString().split("-")[0].toUpperCase();

  return str;
};

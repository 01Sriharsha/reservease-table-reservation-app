import { TOAST_PROP } from "@/context/Provider";
import { toast } from "react-toastify";


export const calculateDinedate = (date: string) => {
  const dineDate = new Date(date);
  const currentDate = new Date();

  let daysAgo = "";

  if (dineDate > currentDate) {
    toast.error("Dine date cannot be a future date!!", TOAST_PROP);
    return;
  }

  if (dineDate.getMonth() + 1 < currentDate.getMonth() + 1) {
    const month = currentDate.getMonth() + 1 - (dineDate.getMonth() + 1);

    daysAgo = month <= 1 ? "Dined last month ago" : `Dined ${month} month's ago`;

    if(month > 6){
        toast.error("Can post review only for recent 6 months dining!!", TOAST_PROP);
        return; 
    }
  } else {
    const days = currentDate.getDate() - dineDate.getDate();
    daysAgo = `Dined ${days} days ago`;
  }

  return daysAgo;
};

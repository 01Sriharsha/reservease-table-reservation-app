import { usePathname } from "next/navigation";

export default function useSaveCurrentUrl() {
  const pathname = usePathname();

  const saveUrl = () => sessionStorage.setItem("prevUrl", pathname);
  const removeUrl = () => sessionStorage.removeItem("prevUrl");

  return { saveUrl, removeUrl };
}

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/context/Provider";
import "../../node_modules/react-toastify/dist/ReactToastify.min.css";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ReserveEase",
  description: "Table reservation Management application"
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          (inter.className || "font-serif") +
          "max-w-screen-2xl bg-gray-200 min-h-screen m-0 p-0"
        }
      >
        <Provider>
          <main className="max-w-screen-2xl m-auto bg-white relative min-h-screen overflow-y-auto">
            <Navbar />
            <div className="mt-16">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
}

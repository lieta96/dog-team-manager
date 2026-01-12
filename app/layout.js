import { Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { TeamProvider } from "./context/teamContext";
import Footer from "./components/footer";
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Dog Team Manager",
  description: "Manage your dog team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${workSans.variable} antialiased bg-bg text-primary flex flex-col justify-between min-h-screen`}>
        <TeamProvider>
          <Navbar />
          <main className="container mx-auto p-4 flex flex-col gap-8 grow">
            {" "}
            {children}
          </main>
          <Footer />
        </TeamProvider>{" "}
      </body>
    </html>
  );
}

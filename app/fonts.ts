import { Inter, Roboto } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-inter",
    display: "swap",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["500"],
    variable: "--font-roboto",
    display: "swap",
});

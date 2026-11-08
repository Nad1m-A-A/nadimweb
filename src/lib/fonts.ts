import { League_Spartan, Cormorant_Garamond } from "next/font/google";

export const displayFont = Cormorant_Garamond({
    subsets: ["latin"],
    weight: "300",
});

export const appFont = League_Spartan({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
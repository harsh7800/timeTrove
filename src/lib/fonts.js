import { Poppins, Noto_Serif_Display, Marcellus_SC } from "next/font/google";

export const poppins_init = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500"],
});

export const noto_serif_display_init = Noto_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto_serif_display",
  weight: ["400", "500"],
});
export const Marcellus_init = Marcellus_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus_sc",
  weight: ["400"],
});

export const poppins = poppins_init.variable;
export const noto_serif_display = noto_serif_display_init.variable;
export const marcellus_sc = Marcellus_init.variable;

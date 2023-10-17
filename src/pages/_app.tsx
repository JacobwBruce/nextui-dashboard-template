import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);

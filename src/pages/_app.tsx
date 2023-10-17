import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);

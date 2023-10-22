import { NextUIProvider } from "@nextui-org/react";
import { type AppType } from "next/app";
import { Toaster } from "sonner";

import { api } from "~/utils/api";

import Clerk from "~/components/providers/Clerk";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <Clerk {...pageProps}>
        <Component {...pageProps} />
        <Toaster richColors />
      </Clerk>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);

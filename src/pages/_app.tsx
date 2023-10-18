import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Clerk from "~/components/providers/Clerk";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <Clerk {...pageProps}>
        <Component {...pageProps} />
      </Clerk>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);

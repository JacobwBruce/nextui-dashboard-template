import { type AppType } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Clerk from "~/components/providers/Clerk";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        <Clerk>
          <Component {...pageProps} />
        </Clerk>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);

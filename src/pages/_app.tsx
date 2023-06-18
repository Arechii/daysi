import { Analytics } from "@vercel/analytics/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);

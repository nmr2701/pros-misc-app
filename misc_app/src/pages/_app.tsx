import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

  return (
    <div className={GeistSans.className}>
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);

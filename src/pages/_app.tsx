// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import '@styles/date-picker-reset.css'
import "@styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import TipsterLayout from "@components/layout/TipsterLayout";

const MyApp: AppType = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const router = useRouter();
    const noLayoutRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];
    const tipsterRoutes = ["/tipster-rating", "/tipster-competition"];

    function getLayout(): ReactElement {
        if (!noLayoutRoutes.includes(router.asPath.split('?')[0] ?? '')) {
            if (tipsterRoutes.includes(router.asPath.split('?')[0] ?? '')) {
                return (
                    <TipsterLayout>
                        <Component {...pageProps} />
                    </TipsterLayout>
                );
            }
            return (
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            );
        }
        return <Component {...pageProps} />;
    }

    return (
        <SessionProvider session={session}>
            {getLayout()}
        </SessionProvider>
    );
};

const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = `${getBaseUrl()}/api/trpc`;

        if (typeof window !== 'undefined') {
            // during client requests
            return {
                url: '/api/trpc',
                transformer: superjson, // optional - adds superjson serialization
            };
        }

        const ONE_DAY_SECONDS = 60 * 60 * 24;
        ctx?.res?.setHeader(
            'Cache-Control',
            `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
        );

        return {
            url,
            transformer: superjson,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
            headers: {
                // optional - inform server that it's an ssr request
                'x-ssr': '1',
            },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: true,
})(MyApp);

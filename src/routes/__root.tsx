import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/enkai/SmoothScroll";
import { Navbar } from "../components/enkai/Navbar";
import { Footer } from "../components/enkai/Footer";
import { Loader } from "../components/enkai/Loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-8xl gold-text">404</h1>
        <p className="mt-4 text-parchment/70">
          This page has left the venue. Let's get you back to the main event.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-6 py-3 font-ui text-xs tracking-[0.2em] uppercase text-white bg-burgundy border border-gold/40 hover:border-gold"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-3xl text-parchment">Something interrupted the show</h1>
        <p className="mt-3 text-sm text-parchment/60">Try again — we'll pick up where we left off.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-6 py-3 font-ui text-xs tracking-[0.2em] uppercase text-white bg-burgundy border border-gold/40 hover:border-gold"
          >
            Try again
          </button>
          <a href="/" className="px-6 py-3 font-ui text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 hover:bg-gold/10">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Enkai Social — India's Real-Time Event Media Company" },
      {
        name: "description",
        content:
          "Enkai Social captures, publishes and amplifies premium events in real time. Where every event goes social. A subsidiary of Echelon Media.",
      },
      { name: "author", content: "Enkai Social" },
      { property: "og:title", content: "Enkai Social — Where Every Event Goes Social" },
      {
        property: "og:description",
        content:
          "India's Real-Time Event Media Company. Live coverage, social-first storytelling, cinematic execution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&family=DM+Sans:wght@400;500;600&family=Great+Vibes&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

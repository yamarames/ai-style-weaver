import { createFileRoute } from "@tanstack/react-router";
import ToonhubHero from "@/components/ToonhubHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOONHUB — 3D Shape Figurines" },
      {
        name: "description",
        content:
          "TOONHUB figurines. The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ToonhubHero />;
}

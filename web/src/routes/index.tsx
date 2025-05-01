import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    throw redirect({ to: "/login" })
  },
});

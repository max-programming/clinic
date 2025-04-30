import { createFileRoute } from "@tanstack/react-router";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const Route = createFileRoute("/swagger")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SwaggerUI url={import.meta.env.VITE_SWAGGER_JSON_URL} />;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/patients_/$patientId/notes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/patients/notes"!</div>;
}

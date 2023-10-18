import { Card, CardBody } from "@nextui-org/react";
import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute title="Home">
      <Card>
        <CardBody>
          <h1>Home</h1>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}

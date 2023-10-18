import { Card, CardBody } from "@nextui-org/react";
import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Customers() {
  return (
    <ProtectedRoute title="Customers">
      <Card>
        <CardBody>
          <h1>Customers</h1>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}

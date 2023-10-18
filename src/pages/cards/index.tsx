import { Card, CardBody } from "@nextui-org/react";
import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Cards() {
  return (
    <ProtectedRoute title="Cards">
      <Card>
        <CardBody>
          <h1>Cards</h1>
        </CardBody>
      </Card>
    </ProtectedRoute>
  );
}

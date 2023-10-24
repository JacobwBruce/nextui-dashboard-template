import { useRouter } from "next/router";
import CustomerDetails from "~/components/customer/details/CustomerDetails";
import CustomerDetailsLoading from "~/components/customer/details/CustomerDetailsLoading";
import ProtectedRoute from "~/components/routes/ProtectedRoute";
import { api } from "~/utils/api";

export default function CustomerPage() {
  const router = useRouter();

  const customerId = parseInt(router.query.id as string);

  const { data: customer, isLoading } = api.customer.getById.useQuery(
    customerId,
    {
      enabled: !!customerId,
    },
  );

  return (
    <ProtectedRoute title="Customer">
      {isLoading && <CustomerDetailsLoading />}
      {customer && !isLoading && <CustomerDetails customer={customer} />}
    </ProtectedRoute>
  );
}

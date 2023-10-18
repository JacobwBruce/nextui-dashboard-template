import ProtectedRoute from "~/components/routes/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute title="Home">
      <p>Home</p>
    </ProtectedRoute>
  );
}

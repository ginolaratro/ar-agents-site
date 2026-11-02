import Link from "next/link";
import NavLayout from "./nav-layout";
import { Container } from "./sections";

export default function NotFound() {
  return (
    <NavLayout>
      <Container className="py-32 text-center">
        <p className="text-sm font-medium text-brand-700">404</p>
        <h1 className="mt-4 text-4xl font-medium text-ink-900">Page not found</h1>
        <p className="mt-4 text-ink-600">The page you were looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 inline-block rounded-lg bg-brand-700 px-5 py-3 text-sm font-medium text-white hover:bg-brand-800">
          Go home
        </Link>
      </Container>
    </NavLayout>
  );
}

import Link from "next/link";
import NavLayout from "./nav-layout";
import { Container } from "./sections";

export default function NotFound() {
  return (
    <NavLayout>
      <Container className="py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you were looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 inline-block rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800">
          Go home
        </Link>
      </Container>
    </NavLayout>
  );
}

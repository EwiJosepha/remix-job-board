import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board" },
    { name: "description", content: "Job board listing" },
  ];
};

export default function Index() {
  return (
    <div className=" flex gap-4">
      Job Board
      <Link to={'/job'}>Go to listings</Link>
    </div>
  );
}
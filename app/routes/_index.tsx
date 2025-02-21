import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Job Board" },
    { name: "description", content: "Job board listing" },
  ];
};

export default function Index() {
  return (
    <div className="">
      Job Board
      <Button>button</Button>
    </div>
  );
}
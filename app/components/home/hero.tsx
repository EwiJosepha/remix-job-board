import { Link } from "@remix-run/react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="bg-black text-white py-24 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Discover top companies and apply to exciting job opportunities in just a few clicks.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="bg-white text-blue-600"><Link to='/all-jobs'>Browse Jobs</Link></Button>
          <Button variant="outline" className="border-white text-white">
            <Link to='/sign-up'>
              Post a Job
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import Button, { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full justify-between flex flex-row px-7 py-10">
      <div className="font-roboto">
        <Button variant='hollow' asChild>
          <Link href='/' className="" >
            <span className="font-extrabold text-lg">SHADOW OF RACISM</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-row gap-2">
        <Button variant='hollow' asChild>
            <Link href="/">GALLERY</Link>
        </Button>

        <Button variant='hollow' asChild>
            <Link href="/">ABOUT</Link>
        </Button>

        <Button variant='hollow' asChild>
            <Link href="/">SIGN-IN</Link>
        </Button>

        <Button variant='default' className="ml-3" asChild>
            <Link href="/">ENTER ID</Link>
        </Button>
      </div>
    </div>
  );
}

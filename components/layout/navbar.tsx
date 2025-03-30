import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full justify-between flex flex-row px-7 py-10">
      <div className="font-roboto">
        <Link href="/" className={`${buttonVariants({ variant: "hollow" })}`}>
          <span className="font-extrabold text-lg">SHADOW OF RACISM</span>
        </Link>
      </div>

      <div className="flex flex-row gap-2">
        <Link href="/" className={buttonVariants({ variant: "hollow" })}>
          GALLERY
        </Link>
        <Link href="/" className={buttonVariants({ variant: "hollow" })}>
          ABOUT
        </Link>
        <Link href="/" className={buttonVariants({ variant: "hollow" })}>
          SIGN-IN
        </Link>
        <Link
          href="/"
          className={`${buttonVariants({ variant: "default" })} ml-3`}
        >
          ENTER ID
        </Link>
      </div>
    </div>
  );
}

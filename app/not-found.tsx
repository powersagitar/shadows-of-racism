import Button, { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-row justify-center items-center flex-1 gap-4">
            <div className="font-roboto leading-[75%] overflow-visible tracking-tighter text-[11rem]">
                404
            </div>
            <div className="flex flex-col gap-3 text-[1rem]">
                <span className="font-roboto text-[2rem] font-medium">Page not found</span>
                <div className="flex flex-col">
                    <span className="font-inter">The requested page does not exist.</span>
                    <span className="font-inter">Please try again.</span>
                </div>
                <Link href='/' className={buttonVariants({ variant: 'default' })}>GO HOME</Link>
            </div>
        </div>
    )
}

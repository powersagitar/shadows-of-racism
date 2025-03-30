import Button from "@/components/ui/button";

export default function NavBar() {
    return (
        <div className="w-full justify-between flex flex-row px-7 py-10">
            <div className="font-roboto">
                <Button variant="hollow" className="font-extrabold text-md">
                    SHADOW OF RACISM
                </Button>
            </div>

            <div className="flex flex-row gap-2">
                <Button variant="hollow">GALLERY</Button>
                <Button variant="hollow">ABOUT</Button>
                <Button variant="hollow">SIGN-IN</Button>
                <Button variant="default">ENTER ID</Button>
            </div>
        </div>
    );
}

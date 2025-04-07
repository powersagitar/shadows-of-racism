import { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback, useState } from "react";
import { z } from 'zod';
import { Artwork } from "./page";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SkeletonImage from "@/components/ui/skeletonimage";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/datepicker";
import Button from "@/components/ui/button";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().min(1),
    artist: z.string().min(1),
    size: z.object({
        w: z.number(),
        h: z.number(),
        d: z.number().optional()
    }),
    medium: z.string().min(1),
    date: z.date().max(new Date()),
    description: z.string(),
    image: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
        message: "A file is required.",
    }),
})

type EditDialogProps = { 
    openButton: React.ReactNode, 
    submit: (values: z.infer<typeof formSchema>) => void, 
    artwork: Artwork 
}

export default function EditDialog({ openButton, submit, artwork }: EditDialogProps ) {
    
    const [ includeDepth, setIncludeDepth ] = useState(false);

    const toggleIncludeDepth = useCallback((e: CheckedState) => setIncludeDepth(e === true), [includeDepth])

    const [ creationDate, setCreationDate ] = useState(artwork.creationDate);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    return (
        <Dialog>
            {/* A DialogTitle is required for screen readers and to keep redix happy */}
            <DialogTitle className="hidden">Manage Artwork</DialogTitle>
            <DialogTrigger asChild>{ openButton }</DialogTrigger>
            <DialogContent className="rounded-none border-3 border-black p-7 w-fit h-[80vh]">
                <div className="flex flex-row justify-between w-fit flex-1">
                    <SkeletonImage src={artwork.image.toString()} className="h-full max-w-[35vw] w-[40vw] object-cover pr-10" useHtmlImg />
                    <Form {...form}> <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4 w-[30vw] max-h-full overflow-y-auto px-2">

                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Piece Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mona Lisa" className="w-full" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <Input label="Artist Name" placeholder="Mohan Dong" containerClassName="w-full" />

                        <div className="flex flex-col gap-2">
                            <span className="font-roboto text-lg">Dimensions (Inches)</span>
                            <div className="flex flex-row gap-2">
                                <Input placeholder="Height" type='number' className="w-[6rem]" />
                                <span className="font-inter text-gray-400">×</span>
                                <Input placeholder="Width" type='number' className="w-[6rem]" />
                                { includeDepth && (<>
                                   <span className="font-inter text-gray-400">×</span>
                                   <Input placeholder="Depth" type='number' className="focus:border-1 w-[6rem]" /> 
                                </>)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="include-depth-toggle" onCheckedChange={toggleIncludeDepth} />
                              <label htmlFor="include-depth-toggle" className="text-sm font-inter leading-none peer-disabled:cursor-not-allowed">
                                Include Depth
                              </label>
                            </div>
                        </div>

                        <Input label="Medium" placeholder="Graphite" containerClassName="w-full" />

                        <DatePicker
                            toggleButton={ <Button>{format(creationDate, "PPP")}</Button> } 
                            onSelect={(date) => { if (date) setCreationDate(date) }} 
                            date={creationDate}
                        />

                    </form> </Form>
                </div>
                <DialogFooter>
                    <Button> Some button here </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


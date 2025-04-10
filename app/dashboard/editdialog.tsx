"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback, useState } from "react";
import { z } from "zod";
import { Artwork } from "./page";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SkeletonImage from "@/components/ui/skeletonimage";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/datepicker";
import Button from "@/components/ui/button";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type EditDialogProps = {
  openButton: React.ReactNode;
  artwork?: Artwork;
};

const descPlaceholder =
  "The Mona Lisa is a half-length portrait painting by the Italian artist Leonardo da Vinci.";

export default function EditDialog({ openButton, artwork }: EditDialogProps) {
  const [includeDepth, setIncludeDepth] = useState(!!artwork?.dimensions.d);

  const [open, setOpen] = useState(false);

  const toggleIncludeDepth = useCallback(
    (e: CheckedState) => setIncludeDepth(e === true),
    [],
  );

  const formSchema = z.object({
    name: z.string().min(1),
    artist: z.string().min(1),
    dimensions: z.object({
      w: z.number().min(0),
      h: z.number().min(0),
      d: z.number().min(0).optional(),
    }),
    medium: z.string().min(1),
    date: z.date().max(today(), { message: "Time travelling is prohibited" }),
    description: z.string(),
    imagefile: (() => {
        const img = z
          .instanceof(File)
          .refine((file) => file instanceof File && file.type.startsWith('image/'), {
            message: "A file is required.",
          })

      if (artwork) return img.optional();

      return img;
    })()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: today(),
      dimensions: { w:0, h:0 },
      ...artwork,
      imagefile: undefined,
    },
  });

  const submit = useCallback((form: z.infer<typeof formSchema>) => {
    alert("Form submit successful");
    console.log(form);
  }, []);

  const confirmClose = useCallback(
    (event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      // change to fancier ways later if desire

      console.log(form)
      if (form.formState.isDirty) {
        if (
          window.confirm("Are you sure you want to discard unsaved changes?")
        ) {
          form.reset();
          setOpen(false);
        }
      } else setOpen(false);
    },
    [form],
  );

  /*
   * I didn't use .map() here is because
   * there are special types of input that only appear once
   * (e.g. date/dimensions)
   *
   * so if someone have a cleaner way of doing this go ahead
   */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* A DialogTitle is required for screen readers and to keep redix happy */}
      <DialogTitle className="hidden">Manage Artwork</DialogTitle>
      <DialogTrigger asChild>{openButton}</DialogTrigger>
      <DialogContent
        className="rounded-none border-3 border-black p-7 w-fit h-[80vh] overflow-y-scroll"
        onEscapeKeyDown={confirmClose}
        onInteractOutside={confirmClose}
        showCloseButton={false}
      >
        <div className="flex flex-row justify-between w-fit flex-1">
          <div className="sticky top-0 max-h-[70vh] max-w-[35vw] w-[40vw] pr-10">
            {artwork ? (
              <SkeletonImage
                src={artwork.image.toString()}
                className="h-full w-full object-cover"
                useHtmlImg
              />
            ) : (
                <div className="border-2 border-black h-full w-full relative cursor-pointer">
                    <span className="absolute left-1/2 top-1/2 -translate-1/2 font-roboto text-lg">
                        Click to upload image
                    </span>
                </div>
            )}
          </div>

          <Form {...form}>
            
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex flex-col gap-4 w-[30vw] max-h-full overflow-y-scroll px-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-lg">
                      Piece Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mona Lisa"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-lg">
                      Artist Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Leonardo da Vinci"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <span className="font-roboto text-lg">Dimensions (Inches)</span>
                <div className="flex flex-row gap-2">
                  <FormField
                    control={form.control}
                    name="dimensions.h"
                    render={({ field }) => (
                      <FormItem>
                        
                        <FormControl>
                          <Input
                            placeholder="Height"
                            type="number"
                            className="w-[6rem]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span className="font-inter text-gray-400">×</span>
                  <FormField
                    control={form.control}
                    name="dimensions.w"
                    render={({ field }) => (
                      <FormItem>
                        
                        <FormControl>
                          <Input
                            placeholder="Width"
                            type="number"
                            className="w-[6rem]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {includeDepth && (
                    <>
                      <span className="font-inter text-gray-400">×</span>
                      <FormField
                        control={form.control}
                        name="dimensions.d"
                        render={({ field }) => (
                          <FormItem>
                            
                            <FormControl>
                              <Input
                                placeholder="Depth"
                                type="number"
                                className="w-[6rem]"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-depth-toggle"
                    onCheckedChange={toggleIncludeDepth}
                    checked={includeDepth}
                  />
                  <label
                    htmlFor="include-depth-toggle"
                    className="text-sm font-inter leading-none peer-disabled:cursor-not-allowed"
                  >
                    Include Depth
                  </label>
                </div>
              </div>

              <FormField
                control={form.control}
                name="medium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-lg">
                      Medium
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Graphite"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-lg">
                      Date Created
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        toggleButton={
                          <Button variant="fakeinput">
                            {format(field.value, "PPP")}
                          </Button>
                        }
                        onSelect={(date) => {
                            date?.setUTCHours(0,0,0,0)
                            field.onChange(date)
                        }}
                        selected={field.value}
                        disabled={{ after: today() }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-roboto text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder={descPlaceholder} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-between gap-2 mt-auto">
                <Button
                  type="reset"
                  className="font-roboto font-lg font-bold w-1/2 px-10 py-5 cursor-pointer"
                  onClick={confirmClose}
                >
                  DISCARD CHANGES
                </Button>
                <Button
                  type="submit"
                  className="font-roboto font-lg font-bold px-10 py-5 w-1/2 cursor-pointer"
                >
                  SAVE
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// to prevent weirdness caused by different times in the same day
function today(){
    const d = new Date;
    d.setUTCHours(0,0,0,0);
    return d;
}

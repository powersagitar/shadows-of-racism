import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-gray-300 text-gray-50", className)}
      {...props}
    />
  );
}

export { Skeleton };

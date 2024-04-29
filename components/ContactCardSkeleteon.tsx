import { Skeleton } from "@/components/ui/skeleton";

export function ContactCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border border-slate-200 rounded-md p-4 w-full">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
  );
}

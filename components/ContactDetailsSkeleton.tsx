import { Skeleton } from "@/components/ui/skeleton";

export function ContactDetailsSkeleton() {
  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <div className="mb-2">
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1 mt-5">
        <div className="pt-5 text-slate-400 italic">
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </>
  );
}

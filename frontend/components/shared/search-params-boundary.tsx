import { ReactNode, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParamsBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Custom Suspense boundary wrapper for components using search params
 * Required for Next.js to properly handle useSearchParams/useQueryState in pages
 */
const SearchParamsLoadingFallback = () => {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
};

export const SearchParamsBoundary = ({
  children,
  fallback = <SearchParamsLoadingFallback />,
}: SearchParamsBoundaryProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

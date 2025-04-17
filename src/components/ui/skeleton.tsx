import { classNames } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-700/50",
        className
      )}
    />
  );
}

export { Skeleton };

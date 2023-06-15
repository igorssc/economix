import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function SkeletonDashboard() {
  return (
    <>
      <Skeleton variant="rectangular" className="w-full !h-20 mb-6" />
      <Stack
        spacing={2}
        className="flex justify-center items-center max-w-[1280px] p-4 m-auto"
      >
        <Skeleton
          variant="rectangular"
          className="w-80 !h-16 mx-auto max-w-full"
        />
        <div className="flex gap-4 pb-6">
          <div className="flex max-md:flex-col gap-4 justify-center items-center">
            <Skeleton variant="circular" className="w-16 !h-16" />
            <Skeleton
              variant="rectangular"
              className="w-32 sm:w-48 md:w-60 !h-16 mx-auto max-w-full"
            />
          </div>
          <div className="flex max-md:flex-col gap-4 justify-center items-center">
            <Skeleton
              variant="rectangular"
              className="max-md:order-2 w-32 sm:w-48 md:w-60 !h-16 mx-auto max-w-full"
            />
            <Skeleton
              variant="circular"
              className="max-md:order-1 w-16 !h-16"
            />
          </div>
        </div>
        <Skeleton variant="rectangular" className="w-full !h-80" />
        <div className="w-full gap-4 grid grid-cols-3">
          <Skeleton variant="rectangular" className="w-full !h-80" />
          <Skeleton variant="rectangular" className="w-full !h-80" />
          <Skeleton variant="rectangular" className="w-full !h-80" />
        </div>
        <Skeleton variant="rectangular" className="w-full !h-80" />
        <div className="w-full gap-4 grid grid-cols-2">
          <Skeleton variant="rectangular" className="w-full !h-80" />
          <Skeleton variant="rectangular" className="w-full !h-80" />
        </div>
      </Stack>
    </>
  );
}

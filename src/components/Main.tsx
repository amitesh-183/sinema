import useFetch from "@/hooks/UseFetch";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useNavigate } from "react-router-dom";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { CardContent } from "./ui/card";

type Props = {
  sectionTitle: string;
  url: string;
  start?: number;
  end?: number;
  genreId?: number;
  searchQuery?: string;
};

const Main: React.FC<Props> = ({
  sectionTitle,
  url,
  genreId,
  searchQuery,
  start = 0,
  end,
}) => {
  const { apiList, loading } = useFetch(url, genreId, searchQuery);
  const navigate = useNavigate();
  const effectiveEnd = end !== undefined ? end : apiList.length;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{sectionTitle}</h1>
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-4 gap-4">
            {new Array(effectiveEnd - start).fill(null).map((_, index) => (
              <div
                key={index}
                className="p-2 border border-slate-800/20 shadow-xl rounded-xl"
              >
                <Skeleton className="w-full h-[300px]" />
                <h4 className="font-bold text-xl text-ellipsis text-nowrap w-full overflow-hidden py-4">
                  <Skeleton className="h-4 w-full" />
                </h4>
                <p className="line-clamp-3 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 grid-cols-3 md:gap-4 gap-0">
            {/* <Carousel className="w-full max-w-sm">
              <CarouselContent className="-ml-1"> */}
            {apiList.slice(start, effectiveEnd).map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/player/${movie.id}`)}
                className=" hover:brightness-125 scale-[0.99] hover:scale-[1] duration-300 p-2 rounded-xl"
              >
                <img
                  className=" w-full 2xl:h-full xl:h-[300px] lg:h-[280px] object-cover md:h-[360px] sm:h-[300px] h-[120px]"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title || movie.name}
                />
                <div className="px-2 w-full">
                  <h4 className="font-semibold text-base py-2 text-ellipsis text-nowrap overflow-hidden">
                    {url.includes("tv") ? movie.name : movie.title}
                  </h4>
                </div>
              </div>
            ))}
            {/* </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel> */}
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;

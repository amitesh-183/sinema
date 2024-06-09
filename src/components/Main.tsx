import useFetch from "@/hooks/UseFetch";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  sectionTitle: string;
  url: string;
  start?: number;
  end?: number;
};

const Main = ({ sectionTitle, url, start, end }: props) => {
  const { apiList, loading } = useFetch(url);
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{sectionTitle}</h1>
        </div>
        <div>
          {loading ? (
            <div className="grid 2xl:grid-cols-4 gap-4">
              {apiList.slice(start, end)?.map((movie) => (
                <div
                  key={movie.id}
                  className=" p-2 border border-slate-800/20 shadow-xl rounded-xl"
                >
                  <Skeleton className="w-full h-[300px]" />
                  <h4 className="font-bold text-xl text-ellipse text-nowrap w-full overflow-hidden py-4">
                    <Skeleton className="h-4 w-[250px]" />
                  </h4>
                  <p className=" line-clamp-3 space-y-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid 2xl:grid-cols-4 grid-cols-4 gap-4">
              {apiList.slice(start, end)?.map((movie) => (
                <div
                  key={movie.id}
                  className="hover:shadow-[0px_0px_10px_#ccc] scale-[0.99] hover:scale-[1] duration-300 p-2 rounded-xl"
                >
                  <img
                    className="rounded-xl w-full lg:h-[340px] h-[180px]"
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                  />
                  <div className="px-2 w-full">
                    <h4 className="font-bold text-lg py-2 text-ellipsis text-nowrap overflow-hidden">
                      {url.includes("tv")
                        ? movie.original_name
                        : movie.original_title}
                    </h4>
                    <p className=" line-clamp-2 text-black/70">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Main;
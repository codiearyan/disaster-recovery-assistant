import { cn } from "../lib/utils";
import Marquee from "./ui/marquee";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchNews } from "../store/slices/newsSlice";
import type { AppDispatch } from "../store/store";
import "./NewsMarquee.css";

const NewsCard = ({
  title,
  source,
  disaster_type,
  country,
  url,
}: {
  title: string;
  source: string;
  disaster_type: string;
  country: string;
  url: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-40 w-80 cursor-pointer overflow-hidden rounded-xl border p-4 mb-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full text-white" 
                style={{ 
                  backgroundColor: disaster_type === 'wildfire' ? '#ef4444' : 
                                 disaster_type === 'flood' ? '#3b82f6' : 
                                 disaster_type === 'earthquake' ? '#f59e0b' : '#10b981'
                }}>
            Disaster Type: {disaster_type.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Source: {source}</span>
        </div>
        <h3 className="text-sm font-medium line-clamp-2 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Country: {country}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">See more...<a href={url} target="_blank" rel="noopener noreferrer">Read more</a></p>
      </div>
    </figure>
  );
};

export function NewsMarqueeVertical() {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-full text-red-500">Error: {error}</div>;
  if (!articles || articles.length === 0) return <div className="flex items-center justify-center h-full">No news available</div>;

  return (
    <div className="relative flex h-[600px] w-[30%] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl p-4">
      <div className="w-full h-full">
        <Marquee pauseOnHover vertical className="[--duration:40s]">
          <div className="flex flex-col gap-4 py-4">
            {articles.map((article, index) => (
              <NewsCard
                key={`first-${index}`}
                title={article.title}
                source={article.source}
                disaster_type={article.disaster_type}
                country={article.country}
                url={article.url}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 py-4">
            {articles.map((article, index) => (
              <NewsCard
                key={`second-${index}`}
                title={article.title}
                source={article.source}
                disaster_type={article.disaster_type}
                country={article.country}
                url={article.url}
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
    </div>
  );
}

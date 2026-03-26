"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/characters/SearchInput";
import { CharacterHeader } from "@/components/characters/CharacterHeader";
import { CardSkeleton } from "@/components/shared/CardSkeleton"; // El que creamos antes
import { fetcher } from "@/lib/api-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GlobalStats } from "@/components/home/GlobalStats";



export default function CharactersPage() {
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["characters", searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      fetcher(
        `https://rickandmortyapi.com/api/character?page=${pageParam}&name=${searchTerm}`,
      ),
    getNextPageParam: (lastPage: any) => {
      if (!lastPage.info.next) return undefined;
      return lastPage.info.next.split("page=");
    },
    initialPageParam: 1,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
 
  if (isError)  
    return (
      <div className="flex  flex-col  items-center justify-center min-h-screen">
        <h2>Error al cargar los datos</h2>
      </div>
    );

  return (
    <div className="text-white py-10 min-h-screen">
      <SearchInput onSearch={(val) => setSearchTerm(val)} />
      <CharacterHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {isLoading
          ? [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
          : data?.pages.map((page) =>
              page.results.map((char: any) => (
                <Card key={char.id} character={char} />
              )),
            )}
      </div>

      <div ref={ref} className="py-10 flex justify-center">
        {isFetchingNextPage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

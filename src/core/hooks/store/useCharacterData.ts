"use client";

import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api-client";
import { useAuthStore } from "@/core/hooks/store/useAuthStore";

export const useCharactersData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuthStore();

  const charactersQuery = useInfiniteQuery({
    queryKey: ["characters", searchQuery],
    queryFn: ({ pageParam = 1 }) => {
      return fetcher(
        `https://rickandmortyapi.com/api/character?page=${pageParam}&name=${searchQuery}`,
      );
    },
    getNextPageParam: (lastPage: any) => {
      const nextUrl = lastPage.info?.next;
      if (!nextUrl) return undefined;
      // Extraemos el número de página de la URL
      const url = new URL(nextUrl);
      return url.searchParams.get("page");
    },
    initialPageParam: "1",
  });

  const ratingsQuery = useQuery({
    queryKey: ["ratings", user?.id],
    queryFn: () => fetcher(`/api/ratings/${user?.id}`),
    enabled: !!user,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const allCharacters =
    charactersQuery.data?.pages.flatMap((page) => page.results) || [];

  return {
    searchQuery,
    handleSearch,
    characters: allCharacters,
    fetchNextPage: charactersQuery.fetchNextPage,
    hasNextPage: charactersQuery.hasNextPage,
    isFetchingNextPage: charactersQuery.isFetchingNextPage,
    isLoading: charactersQuery.isLoading,
    isError: charactersQuery.isError,
    ratings: ratingsQuery.data || [],
    isLoggedIn: !!user,
  };
};

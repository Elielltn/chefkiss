import { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import InputArea from "../components/InputArea";
import RecipesGrid from "../components/RecipesGrid";
import AddRecipeModal from "../components/AddRecipeModal";

import type { typeRecipe } from "../types/typeRecipe";

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);
    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

function RecipesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<typeRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  function handleQueryChange(value: string) {
    setPage(1);
    setQuery(value);
  }

  const debouncedHandleQueryChange = useMemo(
    () => debounce(handleQueryChange, 500),
    [],
  );

  const fetchRecipes = useCallback(
    async (targetPage: number, replace: boolean) => {
      if (replace) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      setUnauthorized(false);
      setShowLoading(false);

      const loadingTimer = setTimeout(() => {
        setShowLoading(true);
      }, 400);

      const params = new URLSearchParams();
      if (query) params.append("search", query);
      params.append("page", `${targetPage}`);

      const response = await fetch(
        `https://chefkiss-sandy.vercel.app/recipes?${params.toString()}`,
        { credentials: "include" },
      );

      if (response.status === 401) {
        setUnauthorized(true);
        setIsLoading(false);
        setIsLoadingMore(false);
        clearTimeout(loadingTimer);
        return;
      }

      clearTimeout(loadingTimer);

      if (!response.ok) {
        console.log("Erro ao buscar suas receitas");
        setIsLoading(false);
        setIsLoadingMore(false);
        return;
      }

      const data = await response.json();
      setRecipes((prev) => (replace ? data.data : [...prev, ...data.data]));
      setHasMore(data.pagination.page < data.pagination.totalPages);
      setIsLoading(false);
      setIsLoadingMore(false);
    },
    [query],
  );

  useEffect(() => {
    setPage(1);
    fetchRecipes(1, true);
  }, [query]);

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecipes(nextPage, false);
  }

  function refreshRecipes() {
    setPage(1);
    fetchRecipes(1, true);
  }

  return (
    <main className="min-h-dvh">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col py-[20px]">
        <Header></Header>
        <InputArea
          onOpenModal={() => setIsModalOpen(true)}
          onChange={debouncedHandleQueryChange}
        ></InputArea>
        <RecipesGrid
          recipes={recipes}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          showLoading={showLoading}
          onClick={handleLoadMore}
          hasMore={hasMore}
          unauthorized={unauthorized}
        ></RecipesGrid>
      </div>
      {isModalOpen && (
        <AddRecipeModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={refreshRecipes}
        />
      )}
    </main>
  );
}

export default RecipesPage;

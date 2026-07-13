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

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    setUnauthorized(false);
    setShowLoading(false);

    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 400);

    const token = localStorage.getItem("token");
    if (!token) {
      setUnauthorized(true);
      setIsLoading(false);
      clearTimeout(loadingTimer);
      return;
    }

    const params = new URLSearchParams();
    if (query) params.append("search", query);
    params.append("page", `${page}`);

    const response = await fetch(
      `http://localhost:3000/recipes?${params.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.status === 401) {
      setUnauthorized(true);
      setIsLoading(false);
      clearTimeout(loadingTimer);
      return;
    }

    clearTimeout(loadingTimer);

    if (!response.ok) {
      console.log("Erro ao buscar suas receitas");
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    setRecipes((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    setHasMore(data.pagination.page < data.pagination.totalPages);
    setIsLoading(false);
  }, [query, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

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
          showLoading={showLoading}
          onClick={() => setPage((p) => p + 1)}
          hasMore={hasMore}
          unauthorized={unauthorized}
        ></RecipesGrid>
      </div>
      {isModalOpen && (
        <AddRecipeModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchRecipes}
        />
      )}
    </main>
  );
}

export default RecipesPage;

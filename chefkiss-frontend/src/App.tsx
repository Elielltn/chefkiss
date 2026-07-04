import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />}></Route>
        <Route path="/recipes" element={<RecipesPage />}></Route>
        <Route path="/recipe" element={<RecipeDetailsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

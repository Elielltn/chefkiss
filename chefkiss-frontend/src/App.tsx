import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import Header from "../components/Header";
import InputArea from "../components/InputArea";
import RecipesGrid from "../components/RecipesGrid";
import AddRecipeModal from "../components/AddRecipeModal";

const recipes = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Torta de Chocolate",
    tags: ["Sobremesa", "Doce"],
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "Pão de Queijo",
    tags: ["Lanche", "Salgado"],
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    name: "Brigadeiro",
    tags: ["Sobremesa", "Doce"],
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    name: "Frango Assado",
    tags: ["Prato principal", "Salgado"],
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    name: "Bolo de Cenoura",
    tags: ["Sobremesa", "Doce"],
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    name: "Coxinha",
    tags: ["Aperitivo", "Salgado"],
  },
  {
    id: "a7b8c9d0-e1f2-3456-abcd-567890123456",
    name: "Suco de Maracujá",
    tags: ["Bebida", "Doce"],
  },
  {
    id: "b8c9d0e1-f2a3-4567-bcde-678901234567",
    name: "Salada Caesar",
    tags: ["Prato principal", "Vegetariano"],
  },
];

function RecipesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen max-w-[1440px] w-full mx-auto flex flex-col py-[20px] z-0">
        <Header></Header>
        <InputArea onOpenModal={() => setIsModalOpen(true)}></InputArea>
        <RecipesGrid recipes={recipes}></RecipesGrid>
      </div>
      {isModalOpen && <AddRecipeModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default RecipesPage;

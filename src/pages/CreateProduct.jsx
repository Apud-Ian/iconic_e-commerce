import { useState } from "react";
import AdminForm from "../components/AdminForm";
import CategoryForm from "../components/CategoryForm";

const CreateProduct = () => {
  const [visible, setVisible] = useState(1);

  const buttons = [
    { id: 1, label: "Crear Producto", color: "blue" },
    { id: 2, label: "Actualizar Producto", color: "green" },
    { id: 3, label: "Crear Categoría", color: "red" },
  ];

  return (
    <div className="relative h-full overflow-hidden w-full flex flex-col items-center justify-center gap-4 p-4">
      {/* Botones de selección */}
      <div className="flex gap-2">
        {buttons.map(({ id, label, color }) => (
          <button
            key={id}
            onClick={() => setVisible(id)}
            className={`rounded-xl p-2 border-2 transition-all duration-300 ${
              visible === id
                ? `bg-${color}-400 border-${color}-900`
                : `bg-${color}-600 border-transparent`
            } hover:bg-${color}-300`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenedor de formularios con animación */}
      <div className="relative w-full lg:h-[1000px] h-[2000px] overflow-hidden mt-4">
        {/* Formulario de Crear Producto */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
            visible === 1 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminForm />
        </div>

        {/* Formulario de Actualizar Producto */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ${
            visible === 2 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminForm />
        </div>

        {/* Formulario de Crear Categoría */}
        <div
          className={`absolute top-0 align-middle justify-center left-0 w-full transition-transform duration-500 ${
            visible === 3 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

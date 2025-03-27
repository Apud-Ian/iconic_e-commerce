import { useState, useEffect } from "react";
import { deleteProductByName, getByCat, getProductByName, updateProduct } from "../api/product.js";
import { getAllCat } from "../api/category.js";

const EditForm = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCat(0, 0);
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleGetProductsByCat = async (Name_Category) => {
    try {
      const productsData = await getByCat(Name_Category, 1);
      setProducts(productsData.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddProduct = async (Name_Product) => {
    try {
      const productData = await getProductByName(Name_Product);
      setProduct(productData.data);
      setName(Name_Product);
      setSelectedCategories(productData.Id_Category || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddCat = (Id_Category) => {
    setSelectedCategories((prev) =>
      prev.includes(Id_Category)
        ? prev.filter((id) => id !== Id_Category)
        : [...prev, Id_Category]
    );
  };

  const handleUpdateProduct = async () => {
    if (!product) return;

    const updatedProduct = {
      Id_Product: product.Id_Product,
      ...(selectedCategories.length > 0 && { Id_Category: selectedCategories }),
      ...(product.Price !== null && product.Price !== undefined && { Price: Number(product.Price) }),
      ...(product.Discount !== null && product.Discount !== undefined && { Discount: Number(product.Discount) }),
    };
      await updateProduct(updatedProduct);
      alert("Producto actualizado exitosamente");
  };

  const handleDeleteProduct = async () => {
    if (!name) {
      alert("Selecciona un producto antes de eliminar.");
      return;
    }

    try {
      await deleteProductByName(name);
      alert(`Producto "${name}" eliminado con éxito.`);
      setProduct(null);
      setName("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4 mb-5 min-h-screen h-full">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Administrar Productos</h2>

        {/* Categorías */}
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Buscar por categoría:</span>
          <ul className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <li
                key={index}
                onClick={() => handleGetProductsByCat(cat.Name_Category)}
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                {cat.Name_Category}
              </li>
            ))}
          </ul>
        </div>

        {/* Productos */}
        <div className="mb-4">
          <span className="text-gray-600 font-semibold">Elige un producto:</span>
          <ul className="mt-2 overflow-x-hidden overflow-y-auto h-90 border p-2 rounded-md bg-gray-50">
            {products.map((p, index) => (
              <li
                key={index}
                onClick={() => handleAddProduct(p.Name_Product)}
                className="p-2 flex items-center gap-4 cursor-pointer hover:bg-gray-200 rounded-md"
              >
                <img src={p.Image_URL} alt={p.Name_Product} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <span className="font-medium text-gray-700">{p.Name_Product}</span>
                  <p className="text-sm text-gray-500">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Detalles del Producto */}
        {product && (
          <div>
            <span className="font-light">{name}</span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col-2">
              <label htmlFor="price">Precio: $</label>
              <input type="number" className=" w-16 rounded" value={product.Price || ""} onChange={(e) => setProduct({...product, Price: e.target.value})} />
              </div>
              <div className="flex gap-0.5 flex-col-2">
              <label htmlFor="discount">Descuento:</label>
              <input type="number" className="w-8 text-end rounded " value={product.Discount || ""} onChange={(e) => setProduct({...product, Discount: e.target.value})} />
              <p>%</p>
              </div>
            </div>

            <ul className="mt-2 space-y-2 overflow-y-auto max-h-32 border rounded-lg p-2">
              {categories.map((cat) => (
                <li className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm" key={cat.Id_Category}>
                  <label htmlFor={cat.Name_Category}>{cat.Name_Category}</label>
                  <input
                    type="checkbox"
                    id={cat.Name_Category}
                    checked={selectedCategories.includes(cat.Id_Category)}
                    onChange={() => handleAddCat(cat.Id_Category)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botones de acción */}
        <button onClick={handleUpdateProduct} className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 mt-4">
          Actualizar Producto
        </button>

        <div className="bg-red-500 p-4 rounded-md text-center mt-4">
          <button onClick={handleDeleteProduct} className="bg-white text-red-500 font-bold px-4 py-2 rounded-md hover:bg-gray-200">
            Borrar producto
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default EditForm;

import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getByCat, getProductByName } from "../api/product.js";
import { getUser } from "../api/user.js";
import { addToCart } from "../api/shopCart.js";
import Aside from "../components/Aside.jsx";
import ProductCarousel from "../components/Carrusel.jsx";
import WhatsAppButton from "../components/ButtonWhatsapp.jsx";

const ProductPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Name_Product } = useParams();
  const location = useLocation();
  const [indeximg, setIndexImg] = useState(0);
  const [user, setUser] = useState({ Id_User: "" });
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [productsCat, setProductsCat] = useState([]);
  const [Image_URL, setImagen] = useState ([]);
  const [Price , setPrice] = useState(0);
  const [Discount , setDiscount] = useState(0);
  const userValidate = useCallback(async () => {
    try {
      const result = await getUser();
      setUser({ Id_User: result.Id_User });
    } catch (err) {
      console.error("Error al obtener usuario:", err.message);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProductByName(Name_Product);
      if (result.data) {
        setData(result.data);
        setColor(result.data.colors[0]);
        setSize(result.data.size || '')
        setImagen(result.data.images[0])
        setPrice(result.data.Price)
        setDiscount(result.data.Discount)
        if (result.data.categories?.length) {
          const productsCatResult = await getByCat(result.data.categories[0], 1);
          setProductsCat(
            productsCatResult.data.filter(p => p.Name_Product !== Name_Product) || []
          );
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [Name_Product]);

  useEffect(() => {
    fetchData();
    userValidate();
    window.scrollTo(0, 0);
  }, [fetchData, userValidate, location.pathname]);

  const handleShopCart = async (Id_Product) => {
    if (user.Id_User) {
      try {
        await addToCart(user.Id_User, Id_Product, 1, size ,color);
      } catch (err) {
        console.error("Error al agregar al carrito:", err.message);
      }
    } else {
      let shopCart = JSON.parse(localStorage.getItem("shopCart")) || [];
      shopCart.push({ Id_Product, color, size , Image_URL, Name_Product , Price  , Discount});
      localStorage.setItem("shopCart", JSON.stringify(shopCart));
    }
  };

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (!data) return <p>No se encontró el producto</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-2">
      <Aside />
      <div className="w-full max-w-5xl mx-auto p-2">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-2/5">
            <div className="flex lg:flex-col gap-2 lg:w-20">
              {data.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Vista ${index}`}
                  className="w-16 h-16 object-cover min-w-16 cursor-pointer rounded-md border hover:border-blue-500"
                  onClick={() => setIndexImg(index)}
                />
              ))}
            </div>
            <img
              src={data.images?.[indeximg]}
              alt={data.Name_Product}
              className="w-full lg:w-96 h-96 object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-3/5">
            <h1 className="text-3xl font-bold">{data.Name_Product}</h1>
            <p className="text-lg text-gray-600">{data.Description_Product}</p>
            <div className="flex gap-4">
              {data.colors?.map((col, index) => (
                <label key={index} className="flex items-center gap-1">
                  <input type="radio" name="color" value={col} onChange={(e) => setColor(e.target.value)} /> {col}
                </label>
              ))}
             <div className=" flex flex-row gap-4">
                {data.dimensionsOrSizes?.Width && data.dimensionsOrSizes?.Height ? (
                  <>
                    <li className="flex flex-col gap-1">
                      <label className="font-light" htmlFor="width">Ancho:</label>
                      <span>{data.dimensionsOrSizes.Width} cm</span>
                    </li>
                    <li className="flex flex-col gap-1">
                      <label className="font-light" htmlFor="height">Alto:</label>
                      <span>{data.dimensionsOrSizes.Height} cm</span>
                    </li>
                  </>
                  ) : (
                    data.sizes?.map((size, index) => (
                      <>
                      <li className="flex flex-col gap-1" key={index}>
                        <label className="font-light" htmlFor={size-size}>{size}:</label>
                        <input 
                          type="radio" 
                          name="size" 
                          id={size-size} 
                          value={size} 
                          onChange={(e) => setSize(e.target.value)} 
                        />
                      </li>
                      </>
                    ))
                  )}
              </div>
            </div>
            <span className="text-2xl font-semibold text-green-600">${Math.trunc(data.Price - (data.Price * data.Discount) / 100)}</span>
            <div className="flex gap-4">
              <button onClick={() => handleShopCart(data.Id_Product)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                🛒 Agregar al carrito
              </button>
              <WhatsAppButton productName={String(data.Name_Product)}  />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl border-b-2 border-[#D4AF37] font-light">Productos relacionados</h2>
          <ProductCarousel products={productsCat}  limit={3}/>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

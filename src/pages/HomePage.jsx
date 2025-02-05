import { NavLink } from "react-router";

const HomePage = () =>{
    return(
    <div className="h-screen w-full bg-black">

    <div className="relative w-full h-[500px]">
      <img
        className="absolute inset-0 w-full h-full object-cover  overflow-hidden"
        src="https://instagram.fmvd1-1.fna.fbcdn.net/v/t39.30808-6/452013047_17964828830781338_4825859611263070756_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTI1eDExMzEuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Dp0dqj3Xlj4Q7kNvgEui3ec&_nc_gid=174877ddaddd46c78f86becd4ef7bdb1&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQxNjQwMjI4MDI0MzkxNDkyNQ%3D%3D.3-ccb7-5&oh=00_AYAJzyo3zoi_RXQsFhkBZUEdv6yZYZSgRLAfYH8ZtJdcrQ&oe=67A91C56&_nc_sid=22de04"
        alt="Fondo"
      />
      <div className=" translate-y-2/5 bg-black">
      <div className="p-8 bg-black opacity-80 ">
      <h3 className="text-2xl text-white font-semibold mb-4">Nuevos Productos</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-4 shadow-lg rounded-lg">
            <NavLink to="/product">
            <div className="h-32 bg-gray-300 rounded"></div>
            <h4 className="mt-2 text-lg font-medium">Producto {i + 1}</h4>
            <p className="text-gray-600">Descripción breve...</p>
            </NavLink>
          </div>
        
        ))}
      </div>
    </div>
    <div className="p-8 bg-black opacity-80">
      <h3 className="text-2xl text-white font-semibold mb-4">Liquidación</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-4 shadow-lg rounded-lg">
                    <NavLink to='/product'>
            <div className="h-32 bg-gray-300 rounded"></div>
            <h4 className="mt-2 text-lg font-medium">Producto {i + 5}</h4>
            <p className="text-gray-600">Últimas unidades...</p>
            </NavLink>
          </div>
        ))}
        
       </div>
     </div>
    </div>
    </div>
  </div>
    );
};

export default HomePage;
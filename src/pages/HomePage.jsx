import ICONIC from '../assets/ICONIC.png'
import Card from "../components/Card.jsx";
const HomePage = () =>{

    return(
    <div className="w-screen overflow-x-hidden bg-white">

    <div className="relative w-full h-[500px]">
      <img
        className="absolute inset-0 w-full h-full object-cover  overflow-hidden"
        src={ICONIC}
        alt="Fondo"
      />
      </div>
      <div className="p-8">
      <h3 className="text-2xl  font-semibold mb-4">Nuevos arribos</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl text-white font-semibold mb-4">Liquidación</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

       </div>
     </div>
    </div>
    );
};

export default HomePage;
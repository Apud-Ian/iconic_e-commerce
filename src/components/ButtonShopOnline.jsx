import { useState } from "react";
import UserForm from "../components/UserForm";

const ComprarOnline = ({ userGmail }) => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    departamento: "",
    ciudad: "",
    direccion: "",
    numero: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShop = ()=>{
        // Muestra la alerta
        setAlert(true);
        setOpen(false)
        // Oculta la alerta después de 4 segundos
        setTimeout(() => {
          setAlert(false);
        }, 4000);
  }
  return (
    <>
      {userGmail ? (
        <>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setOpen(true)}
          >
            Comprar Online
          </button>

            
          {alert && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 md:w-1/3 p-4 bg-green-400 text-white text-center rounded shadow-lg">
                        ¡Datos de envíos actualizados correctamente!
                    </div>

                )}
          {open && (
            <div className="fixed inset-0 flex mb-32 lg:mb-0 items-center justify-center">
                
              <div className="bg-white p-6  rounded-lg shadow-lg w-96">
                
                <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium">Departamento</label>
                    <input
                      type="text"
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Número de Domicilio</label>
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleShop()}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            Comprar Online
          </button>

          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center">
            <div className="mb-28 lg:mb-0">
                
              <button className="absolute lg:top-40 lg:left-96 -top-28 right-2" onClick={() => setShowForm(false)}>
                ✖
              </button>
              <UserForm />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ComprarOnline;

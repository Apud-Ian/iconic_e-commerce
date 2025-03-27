import { useEffect, useState } from "react";
import { CreateUser, getUser, getOutUser } from "../api/user";
import UserForm from "../components/UserForm";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    User_Name: "",
    User_LastName: "",
    User_Number: "",
    User_Gmail: "",
    Confirm_User_Gmail: "",
    User_Password: "",
    Confirm_User_Password: "",
    User_Birthday: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await getUser();
        console.log(result)
        setUser(result)
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    checkUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSesion = async () => {
    const result = await getOutUser(); // Llama a la API de cierre de sesión
    console.log(result)
    if (result.message === 'Sesión cerrada') {  // Verifica que la respuesta sea exitosa
      setUser(null);  // Cierra la sesión
      window.location.reload(); 
    } else {
      alert("No se pudo cerrar la sesión. Intenta nuevamente.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.User_Gmail !== formData.Confirm_User_Gmail) {
      alert("Los correos electrónicos no coinciden");
      return;
    }
    if (formData.User_Password !== formData.Confirm_User_Password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await CreateUser({
        User_Name: formData.User_Name,
        User_LastName: formData.User_LastName,
        User_Number: formData.User_Number,
        User_Gmail: formData.User_Gmail,
        User_Password: formData.User_Password,
        User_Birthday: formData.User_Birthday,
      });

      if (result) {
        setUser(result); // Guardar el usuario registrado
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  const isFormIncomplete = Object.values(formData).some(value => value.trim() === "");

  return (
<div className="flex flex-col gap-10 lg:flex-row justify-center items-center min-h-screen bg-gray-50 p-6">
  <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4">
    {user ? (
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Perfil de Usuario</h2>
        <div className="space-y-3 text-gray-600">
          <p><strong>Nombre:</strong> {user.User_Name} {user.User_LastName}</p>
          <p><strong>Número:</strong> {user.User_Number}</p>
          <p><strong>Email:</strong> {user.User_Gmail}</p>
          <p><strong>Fecha de Nacimiento:</strong>{new Date(user.User_Birthday).toLocaleDateString('es-ES')}</p>
        </div>
        <div className="w-full flex justify-end items-end">
        <button className=" rounded shadow m-2" onClick={()=>{handleCloseSesion()}}>Cerrar sesion</button>
        </div> 
      </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Crear Usuario</h2>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input type="text" name="User_Name" placeholder="Nombre" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="text" name="User_LastName" placeholder="Apellido" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="text" name="User_Number" placeholder="Número" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="email" name="User_Gmail" placeholder="Gmail" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="email" name="Confirm_User_Gmail" placeholder="Confirmar Gmail" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="password" name="User_Password" placeholder="Contraseña" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="password" name="Confirm_User_Password" placeholder="Confirmar Contraseña" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <input type="date" name="User_Birthday" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400" onChange={handleChange} required />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all" disabled={isFormIncomplete}>
            Registrar
          </button>
        </form>
      </div>
      )}
      
    </div>
{ !user ?
    <UserForm/>
    :
    <></>
}
    </div>
  );
};

export default UserPage;

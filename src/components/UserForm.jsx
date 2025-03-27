import { useState } from "react";
import { NavLink } from "react-router-dom"; // Corregido
import { loginUser } from "../api/user";

const UserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        const userData = { User_Gmail: email, User_Password: password };
        await loginUser(userData);
        window.location.reload();
    };

    return (
        <div className="flex justify-center items-center w-96 min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-500 transition-all"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">¿No tienes cuenta?</p>
                    <NavLink to="/UserPage">
                        <button className="mt-2 bg-gray-700 text-white font-semibold p-2 rounded-md hover:bg-gray-600 transition-all">
                            Crear Cuenta
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default UserForm;

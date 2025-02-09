import AdminForm from "../components/AdminForm";

const CreateProduct =()=>{
    return(
        <div className="min-h-screen w-full bg-gray-400 flex items-center justify-center gap-8 p-8">
            <AdminForm/>
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Vista Previa</h3>
                <div className="h-40 bg-gray-300 rounded"></div>
                <h4 className="mt-2 text-lg font-medium">Título de la Vista Previa</h4>
                <p className="text-gray-600">Descripción breve...</p>
            </div>
        </div>
    );
};

export default CreateProduct
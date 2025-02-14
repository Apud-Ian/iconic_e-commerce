import AdminForm from "../components/AdminForm";

const CreateProduct = () => {
  return (
    <div className="min-h-screen w-full bg-gray-400 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 p-4">
      <AdminForm />
      <div className="w-full md:w-1/4 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Vista Previa</h3>
        <div className="h-40 bg-gray-300 rounded"></div>
        <h4 className="mt-2 text-lg font-medium">Título de la Vista Previa</h4>
        <p className="text-gray-600">Descripción breve...</p>
      </div>
    </div>
  );
};

export default CreateProduct;

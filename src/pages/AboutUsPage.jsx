import { MapPin, Users, Target } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      {/* Sección: Quiénes Somos */}
      <section className="mb-8 text-center">
        <Users className="mx-auto text-blue-500 w-12 h-12 mb-3" />
        <h2 className="text-2xl font-bold mb-2">¿Quiénes Somos?</h2>
        <p className="text-lg">
          Somos una empresa comprometida con ofrecer productos de calidad y un servicio excepcional. Nuestro equipo trabaja día a día para garantizar la mejor experiencia de compra.
        </p>
      </section>

      {/* Sección: Misión */}
      <section className="mb-8 text-center">
        <Target className="mx-auto text-green-500 w-12 h-12 mb-3" />
        <h2 className="text-2xl font-bold mb-2">Nuestra Misión</h2>
        <p className="text-lg">
          Nuestra misión es proporcionar productos innovadores y de alta calidad, asegurando la satisfacción total de nuestros clientes.
        </p>
      </section>

      {/* Sección: Ubicación */}
      <section className="mb-8 text-center">
        <MapPin className="mx-auto text-red-500 w-12 h-12 mb-3" />
        <h2 className="text-2xl font-bold mb-2">Nuestra Ubicación</h2>
        <p className="text-lg">📍 25 de Mayo 251, Tacuarembó</p>
        <iframe
          className="mt-4 rounded-lg m-auto w-96 h-96"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3394.102131508383!2d-55.98423238516824!3d-31.713105002866328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2suy!4v1742501179717!5m2!1ses!2suy"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default AboutUsPage;

const WhatsAppButton = ({productName}) => {
    const handleWhatsAppClick = () => {
    const productUrl = window.location.origin+`/iconic_e-commerce/product/${productName}`;
      const message = `Hola, estoy interesado en comprar *${productName}*. ¿Está disponible? Aquí está el enlace del producto: ${productUrl}`;
      const whatsappUrl = `https://wa.me/59892767290?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    };
  
    return (
      <button
        onClick={handleWhatsAppClick}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
      >
        Comprar por WhatsApp
      </button>
    );
  };
  
  export default WhatsAppButton;
  
const WhatsAppCartButton = ({ products }) => {
    const handleWhatsAppClick = () => {
      if (!products || products.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }
  
      // Generar la lista de productos con nombre, cantidad y descuento
      const productList = products
        .map(
          (product, index) =>
            `${index + 1}. *${product.Name_Product}* - ${product.Quantity} unidades` +
            (product.Discount > 0
              ? ` (Descuento: ${product.Discount}%)`
              : "")
        )
        .join("\n");
  
      // Calcular el total sin descuento
      const totalPrice = products.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
  
      // Calcular el descuento total
      const totalDiscount = products.reduce(
        (acc, item) => acc + item.Price * item.Quantity * (item.Discount / 100),
        0
      );
  
      // Calcular el precio final con descuento aplicado
      const finalPrice = totalPrice - totalDiscount;
  
      // Mensaje para WhatsApp
      const message = `Hola, quiero comprar los siguientes productos:\n\n${productList}\n\n💰 *Total sin descuento: $${totalPrice.toFixed(2)}*\n🔻 *Descuento total: -$${totalDiscount.toFixed(2)}*\n✅ *Total a pagar: $${finalPrice.toFixed(2)}*`;
  
      const whatsappUrl = `https://wa.me/59892767290?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    };
  
    return (
      <button
        onClick={handleWhatsAppClick}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
      >
        Comprar todo por WhatsApp
      </button>
    );
  };
  
  export default WhatsAppCartButton;
  
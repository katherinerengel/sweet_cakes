
import mainInit from "../js/modules/main-init.js";
import moduloPedidos from "../js/modules/pedido.js";
import moduloPedidosPasapalos from "../js/modules/pedido-pasapalos.js";
import moduloCarrito from "../js/modules/carrito.js";
import moduloContactos from "../js/modules/contactos.js";

//Modulos de arranque o procesos
window.main = mainInit;
window.pedidos = moduloPedidos;
window.carrito = moduloCarrito;
window.pedidosPasapalos = moduloPedidosPasapalos;
window.contactos = moduloContactos;
import moduloPedidos from "../modules/pedido.js";
import moduloPedidosPasapalos from "../modules/pedido-pasapalos.js";
import moduloCarrito from "../modules/carrito.js";
import moduloContactos from "../modules/contactos.js";
import PopAlert from "../../popalert/popalert.js";

export function selectOption(event){
    const field = event.target.attributes['data-field'].value;
    const selectedOptions = [...event.target.selectedOptions];
    selectedOptions.map((item)=>{
        moduloPedidos.insertarOne(field, item.innerText);
    })
}

export function inputKeypress(event){
    const field = event.target.attributes['data-field'].value;
    moduloPedidos.insertarOne(field, event.target.value);
}

export function btnGuardar(event){
    moduloCarrito.insertar();
}

export function btnCarrito(event){
    moduloCarrito.irCarrito('tucarrito.html');
}

export function btnEliminar(event){
    moduloCarrito.eliminar(event);
}

export function btnEliminarPedido(event){
    moduloPedidos.eliminar(event);
}


export function btnAnadir(event, idTable){
    moduloPedidos.insertarMany(event, idTable);
}

export function btnGuardarPostres(event){
    moduloCarrito.insertarPostres();
    window.location.href="tucarrito.html"
}

export function btnGuardarPasapalos(event){
    moduloCarrito.insertarPasapalos();
    window.location.href="tucarrito.html"
}

export function selectOptionMax(event, id){
    const field = event.target.attributes['data-field'].value;
    const selectedOptions = [...event.target.selectedOptions];
    selectedOptions.map((item)=>{
        $(`#${id}`).attr('max', item.value);
        iniciarOption($(`#${id}`));
        moduloPedidos.insertarOne(field, item.innerText);
    })
}

function iniciarOption(select) {
    const option = select.children('kt-options-mobile').children('div').children('kt-options').children('kt-option');
   Array.from($(option)).map((x)=> {
        $(x).removeAttr('select');
        $(x).children().children().removeAttr('disabled');
        $(x).children().children().prop('checked', false);
   });

   const selectValue = select.children('kt-select-value');
   const valorSelect = select.attr('placeholder');
   selectValue.addClass('kt-marcador');
   selectValue.attr('data-content', valorSelect);
}

export function btnEliminarPasapalos(event){
    moduloPedidosPasapalos.eliminar(event);
}


export function btnAnadirPasapalos(event, idTable){
    moduloPedidosPasapalos.insertarMany(event, idTable);
}

export function btnAnadirPremium(event, idTable){
    moduloPedidosPasapalos.insertarMany(event, idTable);
}

export function btnAEnviar(event){
    moduloContactos.insertarContactos(event);
}

export function changeCheckComplite(event) {
    moduloContactos.completeDelivery(event);
}

export function changeCheckCollapse(event) {
    moduloContactos.collapseDelivery(event);
}

export function inputActualizar(event) {
    moduloContactos.actualizeDelivery(event);
}

export function enviarWhatsapp(event) {
    moduloContactos.insertarContactos(event);
}

export function changeSelectPremiun(event) {
    moduloPedidosPasapalos.getSelectPremium(event);
}

export function closePopupConst(event) {
    PopAlert.closePopAlert();
}

export function openPopupConst(event) {
    const options = {
        text: 'Estamos trabajando para brindarle un mejor servicio.',
        textBtn: 'Cerrar'
    }
    PopAlert.openPopAlert(options);
}

export function btnConsultar(event){
    moduloCarrito.irConsulta('consulta.html');
}
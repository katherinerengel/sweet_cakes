
import PopAlert from "../../popalert/popalert.js";

var moduloContatos = (function(){
    const init = () => {
        const date = document.getElementById('start-date');
        const now = new Date();
        let today = `${now.getFullYear()}-${(now.getMonth()+1) > 9? '' : '0'}${now.getMonth()+1}-${now.getDate() > 9? '' : '0'}${now.getDate()}`;
        date.value = today;
        const time = document.getElementById('start-time');
        let todayTime = `${now.getHours()}:${now.getMinutes()}`;
        time.value = todayTime;
        let datos = getData();
        datos.datoContacto = {};
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(datos));
    }

    const getData = () => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        return data;
    }

    const insertarContactos = () => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        const inputAll = document.querySelectorAll(`input[name]`);
        if(inputAll.length > 0) {
            data.datoContacto = getInputInit([...inputAll], data.datoContacto);
        }
        if(validaCampos(data.datoContacto)) {
            sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
            enviarMensaje(data);
        } else {
            const options = {
                text: 'Debe completar los campos obligatorios (*)',
                textBtn: 'Continuar'
            }
            PopAlert.openPopAlert(options);
        }
    
        
    }
    
    const getInputInit = (elementos, data) => {
        elementos.map((item)=> {
            const field = item.name;
            if(field != undefined) {
                const value = item.type == 'checkbox' ? item.checked: item.value;
                if(field == 'fecha') {
                    const fecha = new Date(value);
                    const dia = fecha.getDate() >= 10? fecha.getDate() : '0' + fecha.getDate();
                    const mes = fecha.getMonth() >= 10? fecha.getMonth() : '0' + fecha.getMonth();
                    data[field] = `${dia}-${mes}-${fecha.getFullYear()}`;
                } else if(field == 'hora') {
                    const fecha = new Date('2023/02/01 ' + value);  
                    let horas = fecha.getHours();
                    let minutos = fecha.getMinutes();
                    const ampm = horas >= 12 ? 'PM' : 'AM';
                    horas = horas % 12;
                    horas = horas ? horas : 12;
                    horas = horas < 10 ? '0' + horas : horas;
                    minutos = minutos < 10 ? '0' + minutos : minutos;
                    data[field] = `${horas}:${minutos} ${ampm}`;
                } else {
                    data[field] = value;
                }
                    
            }
        });
        return data;
    }

    const validaCampos = (dato) => {
        var valida = [];
        valida.push(dato.nombre.trim().length == 0);
        valida.push(dato.telefono.trim().length == 0);
        valida.push(dato.fecha.trim().length == 0);
        valida.push(dato.hora.trim().length == 0);
        if(dato.delivery) {
            valida.push(dato.nombreEnvio.trim().length == 0);
            valida.push(dato.telefonoEnvio.trim().length == 0);
            valida.push(dato.direccionEnvio.trim().length == 0);
        }

        return !valida.includes(true);
    }

    const completeDelivery = (event) => {
        const inputReal = [...document.querySelectorAll(`input[field]`)];
        const inputCopy = [...document.querySelectorAll(`input[fieldCopy]`)];
        if(event.target.checked) {
            inputCopy.map((x)=>{
                x.setAttribute('disabled', 'true');
                x.value = inputReal.find((f)=> f.name == x.attributes['fieldCopy'].value ).value;
            })
        } else {
            inputCopy.map((x)=>{
                x.removeAttribute('disabled');
                x.value = "";
            })
        }
    }

    const collapseDelivery = (event) => {
        const content = document.querySelector('.div-collapse');
        if(event.target.checked) {
            content.classList.remove('close')
            content.classList.add('open')
        } else {
            content.classList.remove('open')
            content.classList.add('close')
        }
    }

    const actualizeDelivery =  (event) => {
        const deliveryCopy = document.querySelector("input[name='deliveryCopy'");
        const inputReal = [...document.querySelectorAll(`input[field]`)];
        const inputCopy = [...document.querySelectorAll(`input[fieldCopy]`)];
        if(deliveryCopy.checked) {
            inputCopy.map((x)=>{
                x.setAttribute('disabled', 'true');
                x.value = inputReal.find((f)=> f.name == x.attributes['fieldCopy'].value ).value;
            })
        } else {
            inputCopy.map((x)=>{
                x.removeAttribute('disabled');
                x.value = "";
            })
        }
    }

    const enviarMensaje = (data) => {
        $.getJSON( "/js/json/mensaje.json", function( json )
        {        
            var datos = json; 
            console.log(data)
            const mensaje = getCompletarMensaje(datos.mensajeWhatsapp, data);
            window.location.href=`https://wa.me/584128413201?text=${mensaje}`
          
        });
    }

    const getCompletarMensaje = (mensaje, data)  => {
        const cont = data.datoContacto
        const detalle = generarDetalleEnvio([...data.cardTrolley]);
        let auxMensaje = mensaje.replace('(@nombre)', encodeURIComponent(cont.nombre))
        .replace('(@telefono)', encodeURIComponent(cont.telefono))
        .replace('(@fecha)', encodeURIComponent(cont.fecha))
        .replace('(@hora)', encodeURIComponent(cont.hora))
        .replace('(@isDelivery)', cont.delivery? 'SI': 'NO')
        .replace('(@detalle)', detalle);

        if(cont.delivery) {
            const delivery = `*_Datos%20para%20el%20envio_*%0A*Nombre%20y%20apellido%3A*%20(@nombreE)%0A*Tel%C3%A9fono%20de%20contacto%3A*%20(@telefonoE)%0A*Direcci%C3%B3n%20completa%3A*%20(@direccion)%0A%0A`;
            let replaceDel = delivery.replace('(@nombreE)', encodeURIComponent(cont.nombreEnvio))
            .replace('(@telefonoE)', encodeURIComponent(cont.telefonoEnvio))
            .replace('(@direccion)', encodeURIComponent(cont.direccionEnvio))
            auxMensaje = auxMensaje.replace('(@delivery)', replaceDel)
        } else {
            auxMensaje = auxMensaje.replace('(@delivery)', '')
        }
        
        return auxMensaje
    }

    const generarDetalleEnvio = (carrito) => {
        const mensaje = `%0A%0A%20*(@tipo)*%0A%20-%20(@cant)%20(@detalle)`;
        let auxDetalle = '';
        carrito.sort((a,b)=> {
            if(a.tipo.toLowerCase() > b.tipo.toLowerCase()){ return 1} 
            if(a.tipo.toLowerCase() < b.tipo.toLowerCase()){ return -1} 
            return 0
        })
        carrito.map((x)=> {
            let detalle = '';
            if(x.tipo == 'Postres') {
                detalle = (x.detalle)
            } else if(x.tipo == 'Pasapalos') {
                if(x.muestra.includes('premium')) {
                    detalle = (`${x.muestra} - (${x.detalle})`)
                } else {
                    detalle = (`${x.muestra} - ${x.caja} - (${x.detalle})`)
                }
                
            } else {
                detalle = ('Cake de ' + x.tamano  +', con base de '+ x.saborMasa +', con relleno de '+ x.relleno  +', la cubierta de '+ x.cubierta +', topper '+ x.topper)
            }
            let cant = x.cantidad.replace('unidades', '').replace('unidad', '');
            let auxReplace = mensaje.replace('(@tipo)', encodeURIComponent(x.tipo))
            .replace('(@cant)', encodeURIComponent(cant.trim()))
            .replace('(@detalle)', encodeURIComponent(detalle))
            auxDetalle += auxReplace;
        })

        return auxDetalle;
    }

    return {
        init,
        insertarContactos,
        completeDelivery,
        collapseDelivery,
        actualizeDelivery
    }
}())

export default moduloContatos;


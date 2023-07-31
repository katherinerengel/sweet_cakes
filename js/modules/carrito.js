import PopAlert from "../../popalert/popalert.js";

var moduloCarrito = (function () {

    const insertar = () => {
        let data = getData();
        const pedido = data.pedido;
        if(pedido.observacion.trim().length > 0) {
            const trolley = [...data.cardTrolley];
            if(Object.keys(pedido).length > 0) {
                pedido.id = getId(trolley);
                trolley.push(pedido);
                data.cardTrolley = trolley;
                data.pedido = {};
                sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
                
                const cantCard = document.querySelector('.span-cant');
                if(cantCard) {
                    cantCard.innerText = trolley.length;
                }
            }
            window.location.href="tucarrito.html"
        } else {
            const options = {
                text: 'Debe completar los campos obligatorios (*)',
                textBtn: 'Continuar'
            }
            PopAlert.openPopAlert(options);

        }
        
    }

    const insertarPostres = () => {
        let data = getData();
        const pedido = data.pedido;
        const trolley = [...data.cardTrolley];
        const producto = data.pedido.producto;
        producto.map((x)=> {
            let newProduct = x;
            newProduct.id = getId(trolley);
            newProduct.tipo = pedido.tipo;
            if(Object.keys(newProduct).length > 0) {
                trolley.push(newProduct);
                data.cardTrolley = trolley;
                data.pedido = {};
                sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
                
                const cantCard = document.querySelector('.span-cant');
                if(cantCard) {
                    cantCard.innerText = trolley.length;
                }
            }
        })

    }

    const insertarPasapalos = () => {
        let data = getData();
        const pedido = data.pedido;
        const trolley = [...data.cardTrolley];
        const producto = data.pedido.producto;
        producto.map((x)=> {
            let newProduct = x;
            newProduct.id = getId(trolley);
            newProduct.tipo = pedido.tipo;
            if(Object.keys(newProduct).length > 0) {
                trolley.push(newProduct);
                data.cardTrolley = trolley;
                data.pedido = {};
                sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
                
                const cantCard = document.querySelector('.span-cant');
                if(cantCard) {
                    cantCard.innerText = trolley.length;
                }
            }
        })

    }

    const getId = (trolley) => {
        let id = 0;
        if(trolley.length > 0) {
            trolley.sort((a, b)=>{
                if (a.id < b.id) { return 1; }
                if (a.id > b.id) { return -1; }
                return 0;
            })
            const aux = trolley.find((x)=>x);
            id = aux.id + 1;
        }
        
        return id;
    }

    const irCarrito = (url) => {
        let data = getData();
        const trolley = [...data.cardTrolley];
        if(trolley.length > 0) {
            window.location.href = url;
        } else {
            const options = {
                text: 'Carrito vacío',
                textBtn: 'Cerrar'
            }
            PopAlert.openPopAlert(options);
        }
    }

    const irConsulta = (url) => {
        irCarrito(url);
    }

    const detalleCarrito = () => {
        let tableBody = document.getElementById("mf-tbody");
        tableBody.innerHTML = getDetalle(tableBody.innerHTML, cadenaTr);
        let tableBodyMobile = document.getElementById("mf-tbody-mobile");
        tableBodyMobile.innerHTML = getDetalle(tableBodyMobile.innerHTML, cadenaGd);
    }

    const getData = () => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        return data;
    }

    const getDetalle = (datos, cadenaEdit) => {
        let cadenaBody = datos;
        let cadena = cadenaEdit;
        let data = getData();
        const trolley = [...data.cardTrolley];
        trolley.map((x)=> {
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
            cadenaBody += cadena.replace('@id', x.id).replace('@tipo', x.tipo).replace('@detalle', detalle).replace('@cant', x.cantidad);

        })
        return cadenaBody
    }

    const eliminar = (id) => {
        let data = getData();
        const trolley = [...data.cardTrolley];
        const filter = trolley.filter((x)=> x.id != id)
        data.cardTrolley = filter;
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        let tableBody = document.getElementById("mf-tbody");
        let tableBodyMobile = document.getElementById("mf-tbody-mobile");
        tableBody.innerHTML = getDetalle('', cadenaTr);
        tableBodyMobile.innerHTML = getDetalle('', cadenaGd);
    }

    const cadenaTr = 
    '<tr>'
        +'<td class="columna-oculta">@tipo</td>'
        +'<td>@detalle</td>'
        +'<td class="td-center">@cant</td>'
        +'<td class="td-center"><i class="fi fi-rr-trash" onclick="btnEliminar(@id)"></i></td>'
    +'</tr>';

    const cadenaGd = 
    '<div class="grid-row">'
       +'<div class="row-title">'
           +'<div class="row-1"><span>@tipo</span></div>'
           +'<div class="row-2"><i class="fi fi-rr-trash" onclick="btnEliminar(@id)"></i></div>'
       +'</div>'
       +'<div class="row-detalle">'
           +'<div class="row-1-1"><span>Detalle:</span></div>'
           +'<div class="row-1-2"><span>@detalle</span></div>'
           +'<div class="row-2-1"><span>Cantidad:</span></div>'
           +'<div class="row-2-2"><span>@cant</span></div>'
       +'</div>'
    +'</div>';

    return {
        insertar,
        insertarPostres,
        insertarPasapalos,
        eliminar,
        irCarrito,
        detalleCarrito,
        irConsulta
    }
}())

export default moduloCarrito;

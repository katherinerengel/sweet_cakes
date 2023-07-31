
 var moduloPedidos = (function () {

    const initPedido = async (tipo, isMultiple) => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        const cantCard = document.querySelector('.span-cant');
        cantCard.innerText = data.cardTrolley.length;
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        data.pedido.tipo = tipo;
        if(isMultiple) {
            data.pedido.producto = [];
        } else {
            data.pedido.cantidad = '1 unidad';
            const selectAll = document.querySelectorAll('select');
            const inputAll = document.querySelectorAll('input');
            const textareaAll = document.querySelectorAll('textarea');
            if(selectAll.length > 0) {
                data.pedido = await getSelectInit([...selectAll], data.pedido);
            }
            if(inputAll.length > 0) {
                data.pedido = await getInputInit([...inputAll], data.pedido);
            }
            if(textareaAll.length > 0) {
                data.pedido = await getTextareaInit([...textareaAll], data.pedido);
            }
        }

        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
    }

    const getSelectInit = (elementos, data) => {
        elementos.map((item)=> {
            const field = item.attributes['data-field'].value;
            const value = item.selectedOptions[0].innerText;
            data[field] = value;
        });
        return data;
    }

    const getInputInit = (elementos, data) => {
        elementos.map((item)=> {
            const field = item.attributes['data-field'];
            if(field != undefined) {
                const value = item.value;
                data[field.value] = value;
            }
        });
        return data;
    }

    const getTextareaInit = (elementos, data) => {
        elementos.map((item)=> {
            const field = item.attributes['data-field'].value;
            const value = item.value;
            data[field] = value;
        });
        return data;
    }

    const insertarOne = (field, value) => {
       let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
       data.pedido[field] = value;
       sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
    }

    const insertarMany = async (event, idTable) => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        const selectAll = document.querySelectorAll('select');
        if(selectAll.length > 0) {
            const id = getId(data.pedido.producto);
           let auxData = await getSelectInit([...selectAll], {id: id});
           const key = Object.keys(auxData)[1];
           const isAdd = data.pedido.producto.some((x)=> x[key] == auxData[key]);
           if(isAdd) {
            alert('Este postre ya está agregado en lista');
           } else {
            data.pedido.producto.push(auxData);
            insertByTable(idTable, auxData);
           }

        }
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
     }

     const insertByTable = (idTable, data) => {
        let tableBody = document.getElementById("mf-tbody");
        let tableBodyMobile = document.getElementById("mf-tbody-mobile");
        tableBody.innerHTML += cadenaTr.replace('@id', data.id).replace('@detalle', data.detalle).replace('@cant', data.cantidad);
        tableBodyMobile.innerHTML += cadenaGd.replace('@id', data.id).replace('@detalle', data.detalle).replace('@cant', data.cantidad);
     }

     const eliminar = (id) => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        const trolley = [...data.pedido.producto];
        const filter = trolley.filter((x)=> x.id != id)
        data.pedido.producto = filter;
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        let tableBody = document.getElementById("mf-tbody");
        let tableBodyMobile = document.getElementById("mf-tbody-mobile");
        let cadena = '';
        let cadenaMobile = '';
        filter.map((x)=> {
            cadena += cadenaTr.replace('@id', x.id).replace('@detalle', x.detalle).replace('@cant', x.cantidad);
            cadenaMobile += cadenaGd.replace('@id', x.id).replace('@detalle', x.detalle).replace('@cant', x.cantidad);
        })
        tableBody.innerHTML = cadena;
        tableBodyMobile.innerHTML = cadenaMobile;

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

     const cadenaTr = 
     '<tr>'
         +'<td class="td-desc">@detalle</td>'
         +'<td class="td-cantida">@cant</td>'
         +'<td class="td-delete"><i class="fi fi-rr-trash" onclick="btnEliminarPedido(@id)"></i></td>'
     +'</tr>';

     const cadenaGd = 
     '<div class="grid-row">'
        +'<div class="row-title">'
            +'<div class="row-1"><span>Postre</span></div>'
            +'<div class="row-2"><i class="fi fi-rr-trash" onclick="btnEliminarPedido(@id)"></i></div>'
        +'</div>'
        +'<div class="row-detalle">'
            +'<div class="row-1-1"><span>Detalle:</span></div>'
            +'<div class="row-1-2"><span>@detalle</span></div>'
            +'<div class="row-2-1"><span>Cantidad:</span></div>'
            +'<div class="row-2-2"><span>@cant</span></div>'
        +'</div>'
    +'</div>';

    return {
        initPedido,
        insertarOne,
        insertarMany,
        eliminar
    };
}());

export default moduloPedidos;

 var moduloPedidosPasapalos = (function () {

    const insertarMany = async (event, idTable) => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        const selectAll = document.querySelectorAll(`select[name=${event}]`);
        const arrayOption = getSeletKt(event);
        if(arrayOption.length > 0) {
            const id = getId(data.pedido.producto);
            let auxData = await getSelectInit([...selectAll], {id: id}, 'ración', 'raciones');
            auxData.detalle = arrayOption;
            auxData.caja = event.split('-')[1];
            data.pedido.producto.push(auxData);
            insertByTable(idTable, auxData);
            iniciarOption($(`#${event}`));
        } else if(event == 'select-premium') {
            const id = getId(data.pedido.producto);
            let auxData = await getSelectInitPremium([...selectAll], {id: id}, 'unidad', 'unidades');
            auxData.muestra = 'Cajas premium'
            data.pedido.producto.push(auxData);
            insertByTable(idTable, auxData);
        }
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
     }

     const getSeletKt = (event) => {
        let optionSelect = '';
        const option = $(`#${event}`).children('kt-options').children('kt-option[select]');
        Array.from($(option)).map((x, index)=> {
            const label = $(x).children();
            optionSelect += (index == 0 ? '': ' / ') + $(label).text().trim();
        })
        return optionSelect;
     }

     const getSelectInit = (elementos, data, unidOne, unidMany) => {
        elementos.map((item)=> {
            const field = item.attributes['data-field'].value;
            const value = item.selectedOptions[0].innerText;
            data[field] = value;
            data.cantidad = item.value == 1 ? `${item.value} ${unidOne}` :`${item.value} ${unidMany}` 
        });
        return data;
    }

    const getSelectInitPremium = (elementos, data, unidOne, unidMany) => {
        elementos.map((item)=> {
            const field = item.attributes['data-field'].value;
            const value = item.selectedOptions[0].innerText;
            data[field] = value;
            if(field == 'cantidad') {
                data.cantidad = item.value == 1 ? `${item.value} ${unidOne}` :`${item.value} ${unidMany}` 
            }
        });
        return data;
    }

     const insertByTable = (idTable, data) => {
        let tableBody = document.getElementById("mf-tbody");
        let tableBodyMobile = document.getElementById("mf-tbody-mobile");
        tableBody.innerHTML += cadenaTr.replace('@id', data.id).replace('@caja', data.muestra).replace('@detalle', data.detalle).replace('@cant', data.cantidad);
        tableBodyMobile.innerHTML += cadenaGd.replace('@id', data.id).replace('@caja', data.muestra).replace('@detalle', data.detalle).replace('@cant', data.cantidad);
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

    const iniciarOption = (select) => {
        const option = select.children('kt-options').children('kt-option');
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

    const initSelectPremium = () => {
        const select = document.querySelector('.select-premium');
        const selectCantidad = document.querySelector('.select-premium-cant');
        const valueCant = $(selectCantidad).val();
        const optionSelect = $(select).children('option');
        [...optionSelect].map((x, index)=> {
            if($(x).attr('unidades').includes(valueCant)) {
                $(x).show();
            } else {
                $(x).hide();
            }
        });
    }

    const getSelectPremium = (event) => {
        const valueCant = $(event).val();
        const select = document.querySelector('.select-premium');
        const optionSelect = $(select).children('option');
        let isEnc = true;
        [...optionSelect].map((x, index)=> {
            if($(x).attr('unidades').includes(valueCant)) {
                $(x).show();
                if(isEnc) {
                    const value = $(x).val();
                    $(select).val(value);
                    isEnc = false;
                }
            } else {
                $(x).hide();
            }
        });
    }

     const cadenaTr = 
     '<tr>'
         +'<td class="td-desc">@caja</td>'
         +'<td class="td-desc">@detalle</td>'
         +'<td class="td-cantida">@cant</td>'
         +'<td class="td-delete"><i class="fi fi-rr-trash" onclick="btnEliminarPedido(@id)"></i></td>'
     +'</tr>';

     const cadenaGd = 
     '<div class="grid-row">'
        +'<div class="row-title">'
            +'<div class="row-1"><span>@caja</span></div>'
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
        insertarMany,
        eliminar,
        initSelectPremium,
        getSelectPremium
    };
}());

export default moduloPedidosPasapalos;
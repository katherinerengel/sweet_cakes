
 var mainInit = (function () {

    const init = () => {
        if(!validarCarrito()) {
            console.log('Ok')
            $.getJSON( "/js/json/base.json", function( json )
            {        
              var datos = json; 
              sessionStorage.setItem("datosCompraMafer", JSON.stringify(datos));  
              const cantCard = document.querySelector('.span-cant');
              cantCard.innerText = datos.cardTrolley.length;
            });
        } else {
            const data = getData();
            const cantCard = document.querySelector('.span-cant');
            cantCard.innerText = data.cardTrolley.length;
            data.pedido = {};
            sessionStorage.setItem("datosCompraMafer", JSON.stringify(data)); 
        }
    }

    const resizeMf = (className) => {
        const container = document.querySelector(`.${className}`);
        const body = document.querySelector('body');
        const difVentana = window.screen.height-body.clientHeight;
        const ventana = body.clientHeight - difVentana;
        container.style.height = `${ventana}px`;
        const dif = $(document).height() - ventana;
        container.style.height = `${ventana + dif}px`;
    }

    const getData = () => {
        let data = JSON.parse(sessionStorage.getItem('datosCompraMafer'));
        sessionStorage.setItem('datosCompraMafer', JSON.stringify(data));
        return data;
    }

    const validarCarrito = () => {
        const data = getData();
        let cant = 0;
        if(data) {
            cant = data.cardTrolley.length;
        }
        return cant > 0;
    }


    return {
        init,
        resizeMf
    };
}());

export default mainInit;
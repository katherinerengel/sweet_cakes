
var PopAlert = (function () {

    const openPopAlert = (options)=> {
        let html = htmlAlert.replace('@mensaje', options.text)
        .replace('@textBtn', options.textBtn);
        const body = document.body;
        let element = document.createElement('div');
        element.classList.add('popup-construccion');
        element.innerHTML = html;
        body.append(element);
    }

    const closePopAlert = (mensaje)=> {
        const body = document.body;
        const element = document.querySelector('.popup-construccion');
        body.removeChild(element);
    }

    const htmlAlert = `<div class="content-popup">
        <div class="container-pop">
            <img src="img/principal/info.png" alt="">
            <div class="div-mensaje">
                <p>@mensaje</p>
            </div>
        </div>
        <div class="btn-popup">
            <button onclick="closePopupConst(event)">@textBtn</button>
        </div>
    </div>`

    return {
        openPopAlert,
        closePopAlert
    }
}());

export default PopAlert;
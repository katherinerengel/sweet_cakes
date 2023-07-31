$(function () {
    $("#btn-redirect").click(function(){
        window.location.href="categorias.html"
    })

    $("#btn-cakesper").click(function(){
        window.location.href="cakespersonalizadas.html"
    })

    $("#btn-return").click(function(){
        window.location.href="categorias.html"
    })

    $("#btn-cakestra").click(function(){
        window.location.href="cakestradicionales.html"
    })

    $("#btn-postres").click(function(){
        window.location.href="postres.html"
    })

    $("#btn-pasapalos").click(function(){
        window.location.href="pasapalos.html"
    })

    $("#btn-consulta").click(function(){
        window.location.href="consulta.html"
    })
    
    $(".logo img").click(function(){
        if(window.location.pathname.includes('categorias.html')) {
            window.location.href="index.html"
        } else {
            window.location.href="categorias.html"
        }
    })
})
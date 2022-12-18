function abrirContNav(evt, contNombre) {
    evt.preventDefault;
    
    var i, links;

    links = document.getElementsByClassName("cuenNav");
    for (i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace("active", "");
    }
    page = document.getElementsByClassName("catalogo cuenta");
    for (i = 0; i < page.length; i++) {
        page[i].style.display = 'none';
    }
    document.getElementById(contNombre).style.display = "block";

    evt.currentTarget.className += " active";
}

function abrirCont(evt, contNombre) {
}
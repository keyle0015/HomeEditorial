

function changeSqu(e, sqone, sqtwo) {
    e.preventDefault();

    var none = document.getElementById(sqone);
    var notnone = document.getElementById(sqtwo);

    none.style.display = 'none';
    notnone.style.display = "block";
}

// function accountYes(){
//     location.replace("../index.html")
// }

//validar login
var formLogCliente = document.getElementById("form_idL");


formLogCliente.addEventListener('submit', function(e){
	e.preventDefault();

	var datos = new FormData(formLogCliente);

	var email = datos.get('email')

	fetch('http://localhost:3000/api/login',{
		mode: "no-cors",
		method: 'POST',
		body: datos
	})
})


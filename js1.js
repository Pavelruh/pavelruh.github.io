function show (name)
{
	var elem = document.getElementById(name);
	if(elem)
		elem.style.display = "block";
}
function check (){
	if(reg.pass1.value == reg.pass2.value && 
		reg.name.value != 0 && 
		reg.pol.value != 0 &&
		reg.log.value != 0){
		alert("Регистрация успешна")
	}
	else if(reg.pass1.value != reg.pass2.value){
		alert("Пароли не совпадают")
	}
	else {
		alert("Заполнены не все поля")
	}
}
$(function(){
	$('#email').on('focus', (e)=>{hideErrorMessage(e.target)});
	$('#email').on('blur', (e)=>{emailValidation(e.target)});

	$('#password').on('focus', (e)=>{hideErrorMessage(e.target)});
	$('#password').on('blur', (e)=>{passwordValidation(e.target)});

	$('.form__registration-btn').on('click', sendForm);
})

//Скрыть ошибку
function hideErrorMessage(e) {
	$(`#${e.id}`).siblings('.error-message').addClass('hide');
}
//Показать ошибку
function showErrorMessage(e, msg) {
	$(`#${e.id}`).siblings('.error-message').removeClass('hide');
	$(`#${e.id}`).siblings('.error-message').children('p').text(msg);
	setTimeout(()=>{hideErrorMessage(e)}, 3000);
}

// Валидация почты
function emailValidation(e){
	let msg = {value: "", error: false};
	if(e.value.match(/.+@.+\..+/i) !== null){
		msg.value = e.value;
		$(`#${e.id}`).removeClass('error');
		return msg;
	}
	msg.error = "E-Mail некорректный";
	$(`#${e.id}`).attr('class','error');
	showErrorMessage(e, msg.error);
	return msg;
}

// Валидация пароля
function passwordValidation(e){
	let msg = {value: "", error: false};
	if(e.value && e.value.length >= 4){
		msg.value = e.value;
		$(`#${e.id}`).removeClass('error');
		return msg;
	}
	msg.error = "Пароль не должен быть меньше 4 символов";
	$(`#${e.id}`).attr('class','error');
	showErrorMessage(e, msg.error);
	return msg;
}

// Валидация на согласие
function agreementValidation(e){
	let msg = {value: "", error: false};
	if(!e.checked){
		msg.error = "Примите соглашение об окозании услуг";
		showErrorMessage(e, msg.error);
		return msg;
	}
	msg.value = true;
	return msg;
}

// Валюта
function getCurrency (){
	let radioList = $('.form__currency input[type=radio]:checked');
	return radioList[0].value;
}

// Прверка при отправки формы
function sendForm(e) {
	e.preventDefault();
	let parentElement = $(`.${e.target.className}`).parent()[0].elements;

	let msgEmail = emailValidation(parentElement.email);
	let msgPassword = passwordValidation(parentElement.password);
	let msgAgreement = agreementValidation(parentElement.agreement)
	let msgCurrency = getCurrency();

	if(!msgEmail.error && !msgPassword.error && !msgAgreement.error){
		$('.section-errors').removeClass('sect-hide');
		console.log(`E-mail: ${msgEmail.value}
Пароль: ${msgPassword.value}
Выбранная валюта: ${msgCurrency}
Соглашение принято: ${msgAgreement.value}`);
	}
}
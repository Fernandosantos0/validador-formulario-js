// 'use strict'

const formulario = document.querySelector('#formulario');
const campos = document.querySelectorAll('.validar');

// Função para inserir a mensagem de erro
function inserirMensagemErro(msg, elemento, classe) {
    const span = document.createElement('span');
    span.className = classe;
    span.textContent = msg;

    elemento.classList.add('border-error')
    elemento.insertAdjacentElement('afterend', span);
}

function limparMessagemError(classe) {
    console.log(classe)
    /* Esturura for/of para remover as mensagens de erros */
    for(let span of document.querySelectorAll(`.${classe}`)) {
        const campo = span.previousElementSibling;

        span.remove();
        campo.classList.remove('border-error');
    }

}

function handleOnPassword() {
    let resultado = true;

    const senha = document.querySelector('#c-senha');
    const confirmarSenha = document.querySelector('#c-confirmar-senha');

    if(senha.value && senha.value.length < 8 || senha.value.length > 16) {
        inserirMensagemErro('A senha precisa ter entre 8 a 16 caracteres para ser válida', senha, 'span-error-submit');
        resultado = false;
    }

    if(senha.value !== confirmarSenha.value) {
        inserirMensagemErro('A senha não condiz com o que foi passado no campo "Confirmar Senha"', confirmarSenha, 'span-error-submit');
        resultado = false;
    }

    return resultado; 
}

/* Função para validar os campos ao realizar o submit da página */
function handleOnSubmit() {
    let resultado = true;

    limparMessagemError('span-error-change');
    limparMessagemError('span-error-submit');

    for(let campo of campos) {
        const label = campo.previousElementSibling.textContent.toLowerCase();
        
        if(!campo.value) {
            
            if (label === 'senha') {
                inserirMensagemErro(`A ${label} é obrigatória`, campo, 'span-error-submit');
                resultado= false;
                continue;
            }

            inserirMensagemErro(`O ${label} é obrigatório`, campo, 'span-error-submit');
            resultado = false;
        }

    }

    return resultado;
}

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const validarCampos = handleOnSubmit();
    const validarSenha = handleOnPassword();

    if(validarCampos && validarSenha) formulario.submit();
});


campos.forEach(campo => {

    campo.addEventListener('change', e => {
        const el = e.target;

        limparMessagemError('span-error-change');
        limparMessagemError('span-error-submit');

        if(!el.value) {
            const label = el.previousElementSibling.textContent;
            inserirMensagemErro(`O campo ${label} é obrigatório`, el, 'span-error-change');
        }


    });

});
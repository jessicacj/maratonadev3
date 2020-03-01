// Script para o botão

document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

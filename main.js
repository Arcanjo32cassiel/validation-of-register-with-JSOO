class Validator {
    constructor() {
            this.validations = [
                'data-min-length',
            ]
        }
        // iniciar validatação dos campos
    validate(form) {
            // pegar  os inputs
            let inputs = form.getElementsByTagName('input');


            // HTMLColection -> array
            let inputsArray = [...inputs]

            // loop nos inputs
            inputsArray.forEach(input => {

                // loop em todas a validações existentes
                for (let i = 0; this.validations.length > i; i++) {
                    // verifica se a validação atual existe noinput
                    if (input.getAttribute(this.validations[i]) != null) {
                        // data-min-lenght -> minlenght
                        // limpando a string para virar um método 
                        let method = this.validations[i].replace("data-", "").replace("-", "");

                        // valor do input
                        let value = input.getAttribute(this.validations[i])

                        this[method](input, value);
                    }
                }
            }, this);
        }
        // verifica se um input tem um número minimo de  caracteres 
    minlength(input, minValue) {

            let inputLenggth = input.value.length;
            let errorMessage = ` O campo precisa ter pelo menos ${minValue} caracteres`
            if (inputLenggth < minValue) {
                this.printMessage(input, errorMessage)
            }
        }
        // metodo para imprimir mensagem de erro  na tela
    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');

        inputParent.appendChild(template)
    }

}
let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();
submit.addEventListener('click', e => {

    e.preventDefault();

    validator.validate(form)
})
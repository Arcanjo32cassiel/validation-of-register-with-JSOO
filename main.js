class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate'
        ]
    }
    validate(form) {
        // rendeem all validations
        let currentValidations = document.querySelectorAll('form .error-validation');
        let inputss = document.querySelector('#email')

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations, inputss)
        }

        // get every inputs
        let inputs = form.getElementsByTagName('input');

        // turns an HTMLCollection into an  array
        let inputsArray = [...inputs];

        // loop of inputs and validation against what is found
        inputsArray.forEach(input => {

            // loop in every the validations existing
            for (let i = 0; this.validations.length > i; i++) {


                // checks if the current validation exists in the input
                if (input.getAttribute(this.validations[i]) != null) {

                    // cleanring  the string to flip  a method     
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    // value of input
                    let value = input.getAttribute(this.validations[i]);
                    // console.log(method, value)
                    // invoke the method
                    this[method](input, value);
                }

            }
        }, this)
    }



    // checks if a  input has  a number  minnimo of caracteres
    minlength(input, minValue) {
            let inputLength = input.value.length;

            let errorMessage = `O campo  precisa ter pelo menos ${minValue} caracteres`

            if (inputLength < minValue) {
                this.printMessage(input, errorMessage)
            }
        }
        // checks if a  input pass of  limit   of caracteres
    maxlength(input, maxValue) {
            let inputLength = input.value.length;

            let errorMessage = `O campo  precisa ter  menos que ${maxValue} caracteres`

            if (inputLength > maxValue) {
                this.printMessage(input, errorMessage)
            }
        }
        //     // validates emails
    emailvalidate(input) {
            // email@email.com 
            let re = /\S+@\S+\.\S+/;

            let email = input.value;

            let errorMessage = `Insira um e-mail no padrão name@email.com `;

            if (!re.test(email)) {
                this.printMessage(input, errorMessage);
            }
        }
        // validates if the field has only letters
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage)
        }
    }

    // checks if the  input is  required
    required(input) {
            let inputValue = input.value;

            if (inputValue === '') {
                let errorMessage = `Esse campo é obrigatório`;

                this.printMessage(input, errorMessage);
            }
        }
        // checks if two fields are equal
    equal(input, inputName) {
            let inputToCompare = document.getElementsByName(inputName)[0];

            let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

            if (input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }
        }
        // validates the field of  password
    passwordvalidate(input) {
            // esplodir  string  em um array

            let charArr = input.value.split("")

            let uppercases = 0;
            let numbers = 0;

            for (let i = 0; charArr.length > i; i++) {
                if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                    uppercases++;
                } else if (!isNaN(parseInt(charArr[i]))) {
                    numbers++;
                }
            }
            if (uppercases === 0 || numbers === 0) {
                let errorMessage = ` A senha precisa de um caractere maiúsculo e um número`;

                this.printMessage(input, errorMessage);
            }
        }
        // method  to print menssage of error in the display
    printMessage(input, msg) {
            //  amount of errors
            let errorsAmt = input.parentNode.querySelector('.error-validation');
            if (errorsAmt === null) {
                let template = document.querySelector('.error-validation').cloneNode(true);

                template.textContent = msg;

                let inputParent = input.parentNode;

                template.classList.remove('template');

                inputParent.appendChild(template)
            }
        }
        // clear  thes validations of display
    cleanValidations(validations, inputss) {
        validations.forEach(el => el.remove());
        inputss.classList.add('bordervalidate')
    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// event that triggers the valitions
submit.addEventListener('click', e => {
    e.preventDefault();

    // passes the form to the validate method
    validator.validate(form)

})

let eye = document.getElementById('eye');
let inputeye = document.getElementById('inputeye')
eye.addEventListener('click', event => {
    inputeye.type = inputeye.type === 'text' ? 'password' : 'text';
    eye.classList.toggle('fa-eye');
    eye.classList.toggle('fa-eye-slash')
})
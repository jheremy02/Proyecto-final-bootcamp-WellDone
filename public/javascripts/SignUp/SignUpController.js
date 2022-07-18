import { signUpService } from "./SignUpService.js";
import { pubSub } from "../pubSub.js";

export class SignUpController {

    constructor (signUpFormElement){

        this.signUpFormElement=signUpFormElement;
        this.main()
    }

    main(){
        this.onAnyInputChanged();
        this.onSubmitForm()
    }

    onAnyInputChanged () {
        const inputElements=Array.from(this.signUpFormElement.querySelectorAll('input'))
        inputElements.forEach(element=>{
            element.addEventListener('input',()=>{
                this.checkIfAllInputsAreFilled(inputElements)
            })
        })
     }


    checkIfAllInputsAreFilled(inputElements) {
        const areAllInputsFilled = inputElements.every(element=>element.value)

        if (areAllInputsFilled) {
            this.signUpFormElement.querySelector("button").removeAttribute("disabled");

        } else {
            this.signUpFormElement.querySelector("button").setAttribute("disabled",'');
        }
    }


    onSubmitForm(){


        this.signUpFormElement.addEventListener('submit',(event)=>{
            event.preventDefault()
            const inputElements=new FormData(this.signUpFormElement)
            const name= inputElements.get('inputName')
            const lastName= inputElements.get('inputLastName')
            const email=inputElements.get('inputEmail')
            const userName= inputElements.get('inputUsername')
            const password=inputElements.get('inputPassword')
            const confirmPassword=inputElements.get('inputConfirmPassword')

            const userData={name,lastName,email,userName,password,confirmPassword}
            const arePasswordEqual=this.checkIfPasswordsAreEqual(password,confirmPassword)
            if (!arePasswordEqual) {
                console.log("Error , contraseñas deben ser iguales")
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"contraseñas deben ser iguales")
                return;
            }

            const isPasswordValid=this.checkIfPasswordMatchRegExp(password)

            if (!isPasswordValid) {
                console.log("la contraseña no es valida")
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"La contraseña no es valida")
                return;
            }

            const isValidEmail=this.validateEmail(email)
            console.log(isValidEmail)
            if (!isValidEmail) {
                console.log("Email Invalido")
                pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"Email invalido")
                return;
            }

            this.createUser(userData)

        })
    }

    checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
        return passwordInput === passwordMatchInput;
      }

    checkIfPasswordMatchRegExp(password) {
        const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);

        return passwordRegExp.test(password);
      }



    validateEmail(email){
        return String(email)
        .toLowerCase()
        .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    }


    // la entrada deberia ser un objeto con los valores de los campos de registro
    async createUser(userData) {
        //const templateSpinner=buildpublicationsSpinnerView()
        try {
            await signUpService.createUser(userData)

            pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Usuario registrado con exito")
            this.loginUser(userData.userName,userData.password)
        } catch (error) {

          if (Array.isArray(error)) {
            error.forEach((error)=>{
              pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error.msg || error)
            })
          }   else {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
          }



        }

    }

    async loginUser(username,password){

        try {
            await signUpService.loginUser(username,password)
            window.location.href='/'

        } catch (error) {
            pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
        }

    }

    static async  closeSession(){
        window.localStorage.removeItem('token')
        window.location.href='/'
    }

     isIterable (value) {
      return Symbol.iterator in Object(value);
    }
}

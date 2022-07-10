import { LoginController } from "./LoginController.js";


document.addEventListener('DOMContentLoaded',()=>{

    const loginFormElement=document.querySelector('form')
    const loginController=new LoginController(loginFormElement)

})

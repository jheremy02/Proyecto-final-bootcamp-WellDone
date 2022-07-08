

import { SignUpController } from "/javascripts/SignUp/SignUpController.js";

document.addEventListener('DOMContentLoaded',()=>{

    const signUpFormElement=document.querySelector("form")
    const signUpController=new SignUpController(signUpFormElement)
})

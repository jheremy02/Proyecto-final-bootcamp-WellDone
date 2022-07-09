

import { SignUpController } from "./SignUpController.js";
import { NotificationController } from "../Notification/NotificationController.js";


document.addEventListener('DOMContentLoaded',()=>{

    const signUpFormElement=document.querySelector("form")
    const notificationElement=document.querySelector('#notification-container')
    const notificationController=new NotificationController(notificationElement)
    const signUpController=new SignUpController(signUpFormElement)
})

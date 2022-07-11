import { LoginController } from "./LoginController.js";
import { NotificationController } from "../Notification/NotificationController.js";

document.addEventListener('DOMContentLoaded',()=>{

    const loginFormElement=document.querySelector('form')
    const notificationElement=document.querySelector('#notification-container')
    const notificationController=new NotificationController(notificationElement)
    const loginController=new LoginController(loginFormElement)

})

import { CreatePublication } from "./CreatePublicationController.js";
import { NotificationController } from "../Notification/NotificationController.js";
import {navigationController} from "../Navigation/NavigationController.js"
document.addEventListener('DOMContentLoaded',()=>{
const createFormElement=document.querySelector('form');
const notificationElement=document.querySelector('#notification-container')
const notificationController=new NotificationController(notificationElement)

const createPublicationController=new CreatePublication(createFormElement)
navigationController.handleButton()


})


import { UserController } from "./UserController.js";
import { NotificationController } from "../Notification/NotificationController.js";
import {navigationController} from "../Navigation/NavigationController.js"

document.addEventListener("DOMContentLoaded",()=>{

const editUserElement= document.querySelector("form")
const userController= new UserController(editUserElement)
const notificationElement=document.querySelector('#notification-container')
const notificationController=new NotificationController(notificationElement)

navigationController.handleButton()
userController.main()


})

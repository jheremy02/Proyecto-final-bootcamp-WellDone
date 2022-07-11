//import AdvertisementsService from "./AdvertisementsService.js";
//import {AdvertisementsController} from "./AdvertisementsController.js";
import { NotificationController } from "./Notification/NotificationController.js";
import {navigationController} from "./Navigation/NavigationController.js"

document.addEventListener("DOMContentLoaded",()=>{
  const notificationElement=document.querySelector('.notification')
  const notificationController=new NotificationController(notificationElement)

  navigationController.handleButton()
})

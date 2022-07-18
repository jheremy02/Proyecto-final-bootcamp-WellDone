//import publicationsService from "./publicationsService.js";
import { NotificationController } from "./Notification/NotificationController.js";
import {navigationController} from "./Navigation/NavigationController.js"
import { PublicationsController } from "./Publication/PublicationController.js";

document.addEventListener("DOMContentLoaded",()=>{
  const notificationElement=document.querySelector('#notification-container')
  const notificationController=new NotificationController(notificationElement)

  const recentPublicationsElement=document.querySelector(".recent-post-section")

  const publicationsController=new PublicationsController(recentPublicationsElement)

  navigationController.handleButton()
})

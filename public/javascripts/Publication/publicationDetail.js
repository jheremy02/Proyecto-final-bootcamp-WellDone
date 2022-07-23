import { PublicationDetailController } from "./PublicationDetailController.js"
import { NotificationController } from "../Notification/NotificationController.js";
import { navigationController } from "../Navigation/NavigationController.js";

document.addEventListener("DOMContentLoaded",()=>{

  const publicationContainerElement=document.querySelector(".post-detail-container")
  const notificationElement=document.querySelector('#notification-container')
  const notificationController=new NotificationController(notificationElement)
  const publicationDetailController = new PublicationDetailController (publicationContainerElement)


  publicationDetailController.showPublication(publicationContainerElement.id)
  navigationController.handleButton()
})

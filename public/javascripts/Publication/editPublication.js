import { NotificationController } from "../Notification/NotificationController.js";
import { PublicationDetailController } from "./PublicationDetailController.js";


document.addEventListener("DOMContentLoaded",()=>{
  const updateFormElement=document.querySelector("form")
  const notificationElement=document.querySelector('#notification-container')
  const notificationController=new NotificationController(notificationElement)
  const publicationDetailController = new PublicationDetailController (updateFormElement)
  publicationDetailController.handleButtonCategories()
  publicationDetailController.onSubmitEditForm()




})

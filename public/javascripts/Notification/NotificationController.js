import {notificactionViews} from "./NotificationView.js";

import { pubSub } from "../pubSub.js";

export class NotificationController {
    constructor (notificationElement) {
        this.notificationElement=notificationElement

        this.suscribeToEvents()
    }



    suscribeToEvents() {

        pubSub.subscribe("SHOW_ERROR_NOTIFICATION",(message)=>{
            this.showError(message)
        })

        pubSub.subscribe(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,(message)=>{
            this.showSuccess(message)
        })
        pubSub.subscribe(pubSub.TOPICS.DELETE_NOTIFICATION),()=>{
            this.deleteNotification()
        }
    }


    showError(message) {
        const notificationTemplate=notificactionViews.buildNotificationError(message)
        const notificationItem=document.createElement('div')
        notificationItem.innerHTML=notificationTemplate
        this.notificationElement.appendChild(notificationItem)

        const closeButtonElement=notificationItem.querySelector("button")
        closeButtonElement.addEventListener('click',(event)=>{

          this.notificationElement.innerHTML=''
      })

    }

    showSuccess(message){
      const notificationTemplate=notificactionViews.buildNotificationSuccess(message)
        const notificationItem=document.createElement('div')
        notificationItem.innerHTML=notificationTemplate
        this.notificationElement.appendChild(notificationItem)

        const closeButtonElement=notificationItem.querySelector("button")
        closeButtonElement.addEventListener('click',(event)=>{

          this.notificationElement.innerHTML=''
      })
    }

    deleteNotification() {
       return ;
    }
}

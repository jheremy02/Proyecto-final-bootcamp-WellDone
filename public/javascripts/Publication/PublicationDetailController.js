
import PublicationService from "./PublicationService.js";
import { publicationsView } from "./PublicationViews.js";
import { pubSub } from "../pubSub.js";
import { signUpService} from "../SignUp/SignUpService.js";
import { navigationController } from "../Navigation/NavigationController.js";
import { UserService } from "../User/UserService.js";
import { UserController } from "../User/UserController.js";
import { decodeToken } from "../../utils/decodeToken.js";

export class PublicationDetailController {
  constructor(publicationDetailElement){
    this.publicationDetailElement=publicationDetailElement
  }

  async showPublication(publicationId){
    this.publication=null
    try {

      this.publication=await PublicationService.getPublication(publicationId)

      if (!this.publication) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,"No se encontro la publicacion")

        this.publicationDetailElement.innerHTML="";
        return;
      }

      const authorPublication=await UserService.getUser(this.publication.userName)

      const publicationTemplate=publicationsView.buildPublicationDetailView(this.publication,authorPublication)
      console.log("hello Item")
      const publicationItem=document.createElement("article")
      publicationItem.className="post-item"
      publicationItem.innerHTML=publicationTemplate

      this.publication.categories.forEach((categoryName)=>{
        const categoryItem=document.createElement("div")
        categoryItem.className="post-item-categories"
        const categoryTemplate=publicationsView.buildCategoryItem(categoryName)
        categoryItem.innerHTML=categoryTemplate
        if (!authorPublication.image) {
          const templateAvatar=UserController.generateAvatar(authorPublication)
          publicationItem.querySelector(".author-image").innerHTML=templateAvatar
        }
        publicationItem.querySelector("#categories-container").appendChild(categoryItem)
      })
      this.publicationDetailElement.append(publicationItem)
      console.log("consturie botones")
      this.handleButton()

    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
    }
  }


  handleButton() {
    const loggedUserToken=signUpService.getLoggedUser()

    if (loggedUserToken) {
        //DECODIFICAMOS TOKEN

        const userInfo=decodeToken(loggedUserToken)
        console.log(userInfo)
        //comprobamos si el id del usuario logueado es el mismo que el idUser del anuncio

        const isOwner=this.isOwner(userInfo.data)

        //Pintamos boton
        if (isOwner) {

          const buttonsNode=document.createElement("div")
          buttonsNode.className="buttons-container flex gap-6 text-white"
          //this.drawEditButton(buttonsNode)
            this.drawDeleteButton(buttonsNode)
            this.publicationDetailElement.appendChild(buttonsNode)
        }
    }
}

isOwner(userName) {
    return userName===this.publication.userName
}

async drawDeleteButton(buttonsNode) {
    const buttonDeleteNode=document.createElement("div")
    buttonDeleteNode.className="delete-button"
    const buttonDeleteTemplate=publicationsView.buildDeleteButtonView()
    buttonDeleteNode.innerHTML=buttonDeleteTemplate
    buttonsNode.appendChild(buttonDeleteNode)
    buttonDeleteNode.addEventListener('click',()=>{
        this.deleteButton()
    })
}

async deleteButton(){

    const shouldDelete=window.confirm("Estas seguro que deseas borrar este anuncio ?")

    try {
        if (shouldDelete) {
            this.advertisement.innerHTML=buildAdvertisementsSpinnerView()
            await AdvertisementsService.deleteAdvertisement(this.advertisement.id)

            window.location.href="/"
        }
    } catch (error) {
        pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
    }

}


}


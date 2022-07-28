
import { pubSub } from "../pubSub.js";
import { publicationsView } from "./PublicationViews.js";
import { UserService } from "../User/UserService.js";
import publicationService from "./PublicationService.js";
import { UserController } from "../User/UserController.js";

export class PublicationsController{
  constructor (publicationsElement){
      this.publicationsElement=publicationsElement
      this.main()
  }

  main () {
    this.showpublications()
  }

  async showpublications () {

      let publications;

      //const spinnerTemplate = buildpublicationsSpinnerView()

      //this.publicationsElement.innerHTML=spinnerTemplate

      try {
          publications=await publicationService.getPublications()
          console.log(publications)
          /*
          if (publications.length===0) {
              this.publicationsElement.innerHTML=buildNotFoundpublicationsView()
          }
          */

          const publicationsContainer= document.createElement('div')
          publicationsContainer.className='recent-post-container'


          publications.forEach(async element => { // recorrer cada publicacion
            const author=await UserService.getUser(element.userName)//obtner informacion del autor pasando el nombre de usuario

            const publicationNewItem= document.createElement('div')
              publicationNewItem.className='post-item'

              const publicationTemplate = publicationsView.buildPublicationView(element,author)
              publicationNewItem.innerHTML=publicationTemplate

              //recorro el array de categorias para cada publicacion y construir un template de cada elemento y pintarlos
              element.categories.forEach((categoryName)=>{
                const categoryItem=document.createElement("div")
                categoryItem.className="post-item-categories"
                const categoryTemplate=publicationsView.buildCategoryItem(categoryName)
                categoryItem.innerHTML=categoryTemplate
                
                if (!author.imageProfile) {
                  const templateAvatar=UserController.generateAvatar(author)
                  publicationNewItem.querySelector(".author-image").innerHTML=templateAvatar
                }
                publicationNewItem.querySelector("#categories-container").appendChild(categoryItem)
              })

              publicationsContainer.appendChild(publicationNewItem)
          });



          this.publicationsElement.append(publicationsContainer)
          pubSub.publish(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,"Anuncios cargados con exito")


      } catch (error) {

          pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,error)
      }

      /*
      finally {
          const loader=this.publicationsElement.querySelector('.loader');
          loader.remove()
      }
      */

      /*
      fetch('http://localhost:8000/api/publications')
      .then(data=>{
          return data.json()
      }).then(result=>{

      })
      */
  }



  async createAdvertisement(body) {

      try {
          await publicationsService.createAdvertisement(body)
      } catch (error) {
          console.log(error)
      }

  }



}

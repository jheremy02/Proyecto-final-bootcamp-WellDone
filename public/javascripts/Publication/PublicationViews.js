

export const publicationsView = {
  buildPublicationView (publication,author) {

    const created_at=new Date(publication.createdAt)

    return `
    <a href="/publication/${publication._id}"><img class="post-image" src="${publication.image}" alt=""></a>
    <div id="categories-container" class=" flex flex-wrap gap-2 ">
    </div>
      <div class="post-item-title"><h2>${publication.title}</h2></div>
      <div class="post-item-content">${publication.content}</div>

      <div class="post-author-container">
          <div class="author-image"><img class="w-14 h-14 object-cover rounded-[50%]" src="/${author.imageProfile}" alt=""></div>
          <div class="author-name">${author.name} ${author.lastName}</div>
          <div class="post-item-date">${created_at.getDate()}/${created_at.getMonth()+1}/${created_at.getFullYear()}</div>

      </div>`
  },

  buildCategoryItem(category) {
    return `
      <small>${category}</small>
    `
  },

  buildPublicationDetailView(publication,author){
    const created_at=new Date(publication.createdAt)
    console.log(publication.createdAt)
    console.log(created_at.getMonth())
    return `<div id="categories-container" class=" flex flex-wrap gap-2 ">
    </div>
    <div class="post-item-title"><h1 class="text-3xl">${publication.title}</h1></div>
    <div class="post-author-container">
        <div class="author-image"><img class="w-14 h-14 object-cover rounded-[50%]" src="/${author.imageProfile}" alt=""></div>
        <div class="author-name">${author.name} ${author.lastName}</div>
        <div class="post-item-date">${created_at.getDate()}/${created_at.getMonth()+1}/${created_at.getFullYear()}</div>
    </div>
    <img class="post-image" src="/${publication.image}" alt="">
    <div class="post-item-content">${publication.content}</div>

    <div class="post-written-by">
        <div class="post-written-by-title"><h5>Autor :</h5></div>
        <div class="post-written-author-image">
            <div class="author-image w-20 h-20"><img class="w-20 h-20 object-cover rounded-[50%]" src="/${author.imageProfile}" alt=""></div>
        </div>
        <div class="author-name">${author.name} ${author.lastName}</div>
        <div class="post-written-author-short-biography">
            <p>${author.biography}</p>
        </div>
    </div>
`
  },

  buildDeleteButtonView() {
    return `<button id="delete-button" class="w-20 h-10 bg-primary-fuchsia rounded-md">Delete</button>`
  },

  buildEditButtonView(publicationId){
    return `<a href="/publication/edit/${publicationId}"><button  id="edit-button" class="w-20 h-10 bg-primary-indigo rounded-md">Edit</button></a>`
  },

  buildNotFoundpublicationsView(){
    return `<h1 class="text-white">Ooops!! No hay auncios que mostrar </h1>`
  }

}




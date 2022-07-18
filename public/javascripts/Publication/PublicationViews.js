export const publicationsView = {
  buildPublicationView (publication) {
    return `
    <a href="/publication"><img src="${publication.image}" alt=""></a>
    <div id="categories-container" class=" flex flex-wrap gap-2 ">
    </div>
      <div class="post-item-title"><h2>${publication.title}</h2></div>
      <div class="post-item-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam rem necessitatibus dicta assumenda inventore repellat dignissimos quibusdam nobis quaerat officiis reprehenderit.</div>

      <div class="post-author-container">
          <div class="author-image"></div>
          <div class="author-name">Elon Musk</div>
          <div class="post-item-date">May 02, 2022</div>

      </div>`
  },

  buildCategoryItem(category) {
    return `
      <h5>${category}</h5>
    `
  }
}




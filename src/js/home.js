async function load(){
  //await
  // Mortys
  const BASE_API = 'https://rickandmortyapi.com/api/character/'

  const MORTY = BASE_API + '?name=morty'
  const RICK = BASE_API + '?name=rick'
  const SMITH = BASE_API + '?name=smith'

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data
}
  const $form = document.querySelector('#form')

  const $featuringContainer = document.querySelector('#featuring')

  function setAttributes($element, attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  function featuringTemplate(personaje){
    return(
     `
     <div class="featuring">
       <div class="featuring-image">
         <img src="${personaje.image}" width="70" alt="">
       </div>
       <div class="featuring-content">
         <p class="featuring-title">${personaje.name}</p>
         <p class="featuring-album">${personaje.species}</p>
       </div>
     </div>
     `
    )
  }

  $form.addEventListener('submit', async (event)=> {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
    const data = new FormData($form)
    try {
      const personaje = await getData (`${BASE_API}?name=${data.get('name')}`)
      const HTMLString = featuringTemplate(personaje.results[0])
      $featuringContainer.innerHTML = HTMLString
    }catch(error){
      alert('Sorry, no results for your search')
      $loader.remove()
      $home.classList.remove('search-active')
    }
  })

  // console.log($ricksContainer, $mortysContainer, $smithsContainer)

  function charTemplate (item, category) {
    let name = item.name
    let specie = item.species
    let src = item.image
    let char = item.id
    return(
    `
    <div class="primaryPlaylistItem" data-id="${char}" data-category="${category}">
      <div class="primaryPlaylistItem-image">
        <img src="${src}" width="50" height="50" alt="">
      </div>
      <h4 class="primaryPlaylist-title">${name}</h4>
      <p class="primaryPlaylist-subtitle">${specie}</p>
  </div>
    `
     )
  }
  function modalTemplate(data){
    let name = data.name
    let image = data.image
    return (
      `
      <h1>${name}</h1>
      <div class="modal-content">
        <img src="${image}" alt="" width="170" height="256">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione impedit maiores enim alias ex accusantium quasi cum autem, nam, voluptas tenetur laudantium quod! Odit voluptate illo, voluptas vel quia, quae.</p>
      </div>
      <div class="modal-buttons">
        <button class="modal-btn primary" id="hide-modal">Cerrar Modal</button>
      </div>
      `
    )
  }

  function addEventClick($element) {
    $element.addEventListener('click', () => {
      showModal($element)
    })
  }

  function renderTemplate(character, container, category){
    character.forEach((item) => {
      const HTMLString = charTemplate(item, category)
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      let charElement = html.body.children[0]
      container.append(charElement)
      const image = charElement.querySelector('img')
      image.addEventListener('load', ()=>{
        charElement.classList.add('fadeIn')
      })
      addEventClick(charElement)
    });
  }

  function modalRender(data){
    const HTMLString = modalTemplate(data)
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString
    let element = html.body
    $modal.append(element)
  }

  async function cacheExist(category, url){
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem('listName')
    if (cacheList){
      return JSON.parse(cacheList)
    } const {results: data } = await getData(url)
      window.localStorage.setItem(listName, JSON.stringify(data))

      return data
  }
  // const {results: rickList } = await getData(RICK)
  const rickList = await cacheExist('rick', RICK)
  // window.localStorage.setItem('rickList', JSON.stringify(rickList))
  const $ricksContainer = document.querySelector('#ricks')
  renderTemplate(rickList, $ricksContainer, 'Ricks')

  const mortyList = await cacheExist('morty', MORTY)
  // window.localStorage.setItem('mortyList', JSON.stringify(mortyList))
  const $mortysContainer = document.querySelector('#mortys')
  renderTemplate(mortyList, $mortysContainer, 'Mortys')

  const smithList = await cacheExist('smith', SMITH)
  // window.localStorage.setItem('smithList', JSON.stringify(smithList))
  const $smithsContainer = document.querySelector('#smiths')
  renderTemplate(smithList, $smithsContainer, 'Smiths')


  const $home = document.querySelector('#home')
  // console.log($form, $home, $featuringContainer)
  //const $home = document.getElementById('home')
  const $overlay = document.getElementById('overlay')
  const $modal = document.getElementById('modal')


  const $modalTitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')
  const $modalImage = $modal.querySelector('img')
  console.log($modal, $overlay, $home)

  function findById(list, id){
    return list.find((results) => results.id === parseInt(id, 10))
  }
  function findChar(id, category) {
    switch (category) {
      case 'Ricks': {
        return findById(rickList, id)
      }
      case 'Mortys':{
        return findById(mortyList, id)
      }
      default: {
        return findById(smithList, id)
      }
    }
  }
  function showModal($element){
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findChar(id, category)
    modalRender(data)
    const $hideModal = document.getElementById('hide-modal')
    $hideModal.addEventListener('click', hideModal)
  }
  function hideModal(){
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

}
load()

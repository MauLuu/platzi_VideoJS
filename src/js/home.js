
// const getUserAll = new Promise(function(fulfilled, rejected) {
//   setTimeout(function(){
//     //rejected("Panic attack")
//     fulfilled("Proceso 3s exitoso")
//   }, 3000)
//   })
// const getUser = new Promise(function(fulfilled, rejected) {
//   setTimeout(function() {
//     //rejected("Panic attack")
//     fulfilled("Proceso 5s exitoso")
//   }, 5000)
//   })

// getUser
//   .then(function(){
//     console.log("Proceso exitoso")
//   })
//   .catch(function(){
//     console.log("Todo pa' triqui")
//   })

// Promise.race([
//   getUser,
//   getUserAll,
// ])
// .then(function(msg){
//   console.log(msg)
// })
// .catch(function(msg){
//   console.log(msg)
// })


// $.ajax('https://randomuser.me/api/wewdxc', {
//   method: 'GET',
//   success: function(data){
//     console.log(data)
//   },
//   error: function(error){
//     console.log(error)
//   }
// })

// fetch('https://randomuser.me/api/')
//   .then(function(response){
//     // console.log(response)
//     return response.json()
//   })
//   .then(function(user){
//     // console.log('user', user)
//      console.log('user', user.results[0].name.first)
//   })
//   .catch(function(){
//     console.log("Algo falló")
//   });

(async function load(){           //encerrando toda la funcion la autollamamos
    //await
    async function getData(url){
      const response = await fetch(url)
      const data = await response.json()
      return data
    }
    const $form = document.getElementById('form')
    const $home = document.getElementById('home')
    const $featuringContainer = document.getElementById('featuring')

    function setAttributes($element, attributes) { //1er parametro: elemento al cual le voy a agregar los atributos
      for (const attribute in attributes) {                        //2do parametro: el objeto con los atributos que le voy a pasar al elemnt
        $element.setAttribute(attribute, attributes[attribute])
      }
    }
    $form.addEventListener('submit', (event)=>{ //submit es cuando damos enter en el campo de busqueda
      event.preventDefault()
      $home.classList.add('search-active') //Agregamos una clase al id home
      const $loader = document.createElement('img')
      setAttributes($loader, {
        src: 'src/images/loader.gif',
        height: 50,
        width: 50,
      })
      $featuringContainer.append($loader)
    })


    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
    console.log(actionList, dramaList, animationList)

    function videoItemTemplate(movie){
      return (
        `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>`
      )
    }
    function createTemplate(HTMLString) {
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      return html.body.children[0]
    }
    function addEventClick($element){
      $element.addEventListener('click', function(){
        //alert('click')
        showModal()
      })
    }
    function movieRenderList(list, $container){
      $container.children[0].remove()
      list.forEach((movie) => {
        const HTMLString = videoItemTemplate(movie)
        const movieElement = createTemplate(HTMLString)
        $container.append(movieElement) //
        addEventClick(movieElement)
      })
    }

    const $actionContainer = document.querySelector('#action')
    movieRenderList (actionList.data.movies ,$actionContainer)

    const $dramaContainer = document.getElementById('drama')
    movieRenderList (dramaList.data.movies ,$dramaContainer)

    const $animationContainer = document.getElementById('animation')
    movieRenderList (animationList.data.movies ,$animationContainer)


    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const modalTitle = $modal.querySelector('h1')
    const modalImage = $modal.querySelector('img')
    const modalDescription = $modal.querySelector('p')

    function showModal(){
      $overlay.classList.add('active')
      $modal.style.animation = 'modalIn .8s forwards'
    }
    $hideModal.addEventListener('click', hideModal)
    function hideModal(){
      $overlay.classList.remove('active')
      $modal.style.animation = 'modalOut .8s forwards'
    }


  })()

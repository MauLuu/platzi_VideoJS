async function load() {

const API = "https://randomuser.me/api/"
const API_RM =  "https://rickandmortyapi.com/api/episode/"
const $userContainer = document.getElementById('userCont')
const $episodes = document.getElementById('episodes')
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  async function userList() {
    let list = []
    for (var i = 0; i < 8; i++) {
      let user = await getData(API)
      list.push(user)
      // debugger
    }
    console.log(list)
    return list
  }
  async function episodeList() {
    let rickAndMortyList = []
    for (var i = 0; i < 5; i++) {
      let user = await getData(API_RM)
      rickAndMortyList.push(user)
    }
    return rickAndMortyList
  }

  const list =  await userList()
  const rickAndMortyList = await episodeList()

  function episodeTemplate(source) {
    let epName = source.results.name
    return (
      `
      <li class="myPlaylist-item">
        <a href="#">
          <span>
            ${epName}
          </span>
        </a>
      </li>
      `
    )
  }
  function renderEpisode(){
    let obj = rickAndMortyList.results //destructurar objeto!
    obj.forEach((item) => {
      debugger
      const HTMLString = episodeTemplate(item)
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      $episodes.append(html.body.children[0])
    })
  }
renderEpisode()

  function userTemplate(usr) {
    let name = usr.results[0].name.first
    let img = usr.results[0].picture.thumbnail
    return (
    `
    <li class="playlistFriends-item">
      <a href="#">
        <img src=${img} alt="echame la culpa" />
        <span>
          ${name}
        </span>
      </a>
    </li>
    `
  )
  }
  function renderUser(){
    list.forEach((usr) => {
      const HTMLString = userTemplate(usr)
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLString
      $userContainer.append(html.body.children[0])
    })
  }
renderUser()


}
load()

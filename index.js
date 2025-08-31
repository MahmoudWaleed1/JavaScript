import UI from "./ui.js"
let uiService = new UI()
uiService.displayGames("mmorpg")
uiService.changeGenre() 
const lastId = localStorage.getItem("selectedGameId")
if (lastId) {
    document.querySelector(".gamesPage").classList.add("d-none")
    document.querySelector(".detailsPage").classList.remove("d-none")
    uiService.displayDetails(lastId)
}


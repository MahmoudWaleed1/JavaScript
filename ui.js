import games from "./games.js"
import description from "./description.js"
export default class UI{
    constructor() {
        this.gameService = new games()
        this.descriptionServive = new description()
    }
    async displayGames(genre){
        let content = ""
        let games = await this.gameService.getALLGames(genre)
        for(let i=0;i<games.length;i++){
        content+= `
         <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card h-100" cardId="${games[i].id}">
                        <div class="cardContent">
                            <img src="${games[i].thumbnail}" alt="game img" class="w-100">
                            <div class="title">${games[i].title}</div>
                            <div class="free">Free</div>
                            <div class="details">${games[i].short_description.split(" ").slice(0, 8).join(",")}</div>
                        </div>
                        <div class="footer d-flex justify-content-between align-items-center">
                            <div class="type">${games[i].genre}</div>
                            <div class="platform">${games[i].platform}</div>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById("gamesRow").innerHTML = content
    this.goToDetails();
    }
    async displayDetails(id){
        document.querySelector(".detailsContainer").innerHTML = "" 
        let content = ""
        let description = await this.descriptionServive.getSingleGame(id)
        console.log(description)
        content= `

            <div class="imagePart d-flex flex-column gap-2">
                <h2>Details Game</h2>     
                    <img src="${description.thumbnail}" alt="image alt">
            </div>
           
            <div class="detailsPart position-relative">
                <i class="fa-solid fa-xmark position-absolute" id="close"></i>
                <h2 class="titleDesc">Title: ${description.title}</h2>
                <div class="discription">
                    <div class="category d-flex gap-1">
                        <h6>Category: </h6>
                        <h6 class="categoryH6">${description.genre}</h6>
                    </div>
                    <div class="plat d-flex gap-1">
                        <h6>Platform: </h6>
                        <h6 class="platformH6">${description.platform}</h6>
                    </div>
                    <div class="status d-flex gap-1">
                        <h6>Status: </h6>
                        <h6 class="statusH6">${description.status}</h6>
                    </div>
                </div>
                <h6 class="longDisc">${description.description}</h6>
               <button class="btn rounded-2" id="url">Show Game</button>
            </div>
        `
        document.querySelector(".detailsContainer").innerHTML = content 
        this.goToLink(description.game_url);
        document.getElementById("close").addEventListener("click", (e) =>{
            document.querySelector(".gamesPage").classList.remove("d-none")
            document.querySelector(".detailsPage").classList.add("d-none")
        })
}
    changeGenre(){
        document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
        document.querySelector(".nav-link.active")?.classList.remove("active")
        link.classList.add("active")
        let category = e.target.innerText.toLowerCase()
        this.displayGames(category)
    })
})
    }
    goToDetails(){
        document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", (e) => {
        let id = card.getAttribute("cardId")
        localStorage.setItem("id", id)
        console.log(id)
        this.displayDetails(id)
        document.querySelector(".gamesPage").classList.add("d-none")
        document.querySelector(".detailsPage").classList.remove("d-none")
    })
})
    }
    goToLink(url) {
        let btn = document.getElementById("url");
        if (btn) {
            btn.addEventListener("click", () => {
                window.location.href = url // or window.open(url, "_blank");
            });
        }
    }
}

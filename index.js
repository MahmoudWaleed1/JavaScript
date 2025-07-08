let nameInput = document.getElementById("name")
let urlInput = document.getElementById("url")
let siteArr = []
let urlRegEx = /^(https:\/\/)[A-Za-z0-9/:?_\-=.#&~ !%'()\*\+@;]{5,200}$/
if(localStorage.getItem("links") !=  null){
    siteArr = JSON.parse(localStorage.getItem("links"))
    displayLinks()
}
function addLink(){
    let site = {
        name: nameInput.value,
        link: urlInput.value
    }
    if(isUrlValid(site.link)){
        siteArr.push(site)
        localStorage.setItem("links", JSON.stringify(siteArr))
        nameInput.value = ""
        urlInput.value = ""
    displayLinks()
    }
}
function displayLinks(){
    var content = ""
    for(let i=0;i<siteArr.length;i++){
        content+= `
        <tr>
        <td class= align-middle>${i}</td>
        <td class= align-middle>${siteArr[i].name}</td>
        <td class= align-middle>
        <a href="${siteArr[i].link}" target="_blank">${siteArr[i].link}</a>
        </td>
        <td>
        <button class="btn btn-outline-danger" onclick="deleteLink(${i})">Delete</button>
        </td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = content
}
function deleteLink(index){
    siteArr.splice(index,1)
    displayLinks()
    localStorage.setItem("links", JSON.stringify(siteArr))

}
function isUrlValid(url){
    if(!urlRegEx.test(url)){
        document.getElementById("urlAlert").classList.remove("d-none")
        return false
    }
    else return true
}
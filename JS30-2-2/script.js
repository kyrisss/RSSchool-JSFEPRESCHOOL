const gallery = document.querySelector(".gallery")

let url = "https://api.unsplash.com/photos?page=1&per_page=24&order_by=popular&orientation=landscape&client_id=igRPijZPNylneO7Xt_DPsZDDFHnMse2Ge1Hd5BdPQQQ"

function showImg(arr){
    gallery.innerHTML = "";
    arr.forEach(pic => {
        const img = document.createElement("img")
        img.classList.add("img")
        img.alt = "img"
        img.src = pic.urls.regular
        gallery.append(img)
    })
}

function getPhotos(url){
    fetch(url)
    .then(responce => responce.json())
    .then(data =>{
        console.log(data);
        showImg(data)
    })
    .catch(err => console.log(err))
}
getPhotos(url);

// search
function getSearch(url){
    fetch(url)
    .then(responce => responce.json())
    .then(data =>{
        console.log(data)
        showImg(data.results)
    })
    .catch(err => console.log(err))
}

const loupe = document.querySelector(".search-btn")
const input = document.querySelector(".search")

function createURL(e){

    url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=24&orientation=landscape&client_id=igRPijZPNylneO7Xt_DPsZDDFHnMse2Ge1Hd5BdPQQQ`
    getSearch(url);
}

loupe.addEventListener("click", createURL)
input.addEventListener("keyup", e => {
    if(e.key == "Enter"){
        createURL();
    }
})

const clear = document.querySelector(".clear")

function showClear(){
    // if(input.value == ''){
    //     clear.classList.remove("visible")
    // }
    clear.classList.add("visible")
}

function hideClear(){
    if(input.value == ''){
        clear.classList.remove("visible")
    }
}

function clearInput(){
    input.value = "";
    clear.classList.remove("visible")
}

input.addEventListener("input", showClear)
input.addEventListener("blur", hideClear)

clear.addEventListener("click", clearInput)
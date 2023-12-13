async function getPhotos(query, perPage){

    formattedQuery = query.split(", ").join(",").replace(" ", "_")

    try {
        const res = await fetch('https://api.pexels.com/v1/search?per_page=' + perPage + '&query=' + query, {
            headers: {Authorization: 'x2QsiNbtmoaogzkwYHPeBqPbBLX39RWV2KoHO6yhp2vXPxkKpQ2rpyRJ'}
            })
        const photosList = await res.json();
        // console.log(photosList);
        let photosListRes = photosList
        return(photosListRes);
    }
    catch (e) { 
        console.log(e)
    }
    
}

async function mainAsync (query = 'Ocean, mer du nord', perPage = 10) {

    mainNode = document.getElementById("main");

    if(document.getElementById("photos__container") != null) {
        document.getElementById("main").removeChild(document.getElementById("photos__container"));
    }
    const imageContainerNode = document.createElement("div");
    imageContainerNode.id = "photos__container";
    imageContainerNode.classList.add("container", "d-flex")

    let photos = await getPhotos(query, perPage);
    console.log(photos);
    photos.photos.forEach((photo) => {

        const photoNode = document.createElement("a");
        photoNode.href = photo.src.original;
        const imgNode = document.createElement("img");
        imgNode.src = photo.src.small;
        imgNode.alt = photo.alt;
        photoNode.appendChild(imgNode);
        imageContainerNode.appendChild(photoNode);
    })

    mainNode.appendChild(imageContainerNode);
}


const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", (event)=>{
    event.preventDefault();
    inputTags = document.getElementById("input-tags").value;
    mainAsync(inputTags);
    console.log(inputTags);
})

mainAsync();
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const filterOptions = document.querySelectorAll('input');

let allImagesLoaded = false;
let loadedImgCount = 0;
let totalRequestedImages = 0;
let photosArr = [];

// Unsplash API
const count = 5;
const apiKey ='b2HlDXEYaaf8BeJtySariTvPp36_1SraPoeall8H4go';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=`;

//Get photos from Unsplash API
async function getPhotos() {
    
    try {
        const response = await fetch(apiUrl);
        photosArr = await response.json();
        console.log(photosArr)
        displayPhotos();
         
    } catch(err) {
        console.log(err);
        loader.hidden = true;
        const error = document.createElement('h1');
        error.style.color = '#ff2f2b'
        error.innerText = 'Error Loading Images.';
        imageContainer.appendChild(error);
    }
}

//Check if all images are loaded
function imageLoaded() {
    
    loadedImgCount++;
   
    if (loadedImgCount === totalRequestedImages) {
        allImagesLoaded = true;
        loader.hidden = true;
    }
}

//Helper to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos
function displayPhotos() {
    
    loadedImgCount = 0;
    totalRequestedImages = photosArr.length;
    
    photosArr.forEach((photo) => {
        // Create <a>
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank',
        });
        // Create <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        //Put <img> inside <a> inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

        //Check when each is finished loading
        img.addEventListener('load', imageLoaded);
    });
}

//Check if scroll is near end 
window.addEventListener('scroll', (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && allImagesLoaded) {
        allImagesLoaded = false;
        getPhotos();
    }
});

// Event Listeners


filterOptions.forEach((option) => {

    option.addEventListener('change', (e) => {
        if (e.target.checked) {
            
            let query = e.target.value;
            apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`
            imageContainer.innerHTML = "";
            loader.hidden = false;
            getPhotos();

        }
        
    })
})




//OnLoad
getPhotos();



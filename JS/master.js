//Selectors
const colorsLi = document.querySelectorAll(".color-list li");
let controller = document.querySelector(".control i");
let landingPage = document.querySelector(".landing-page");
let linksContainer = document.querySelector(".landing-page .header-area ul");
let header = document.querySelector(".landing-page .header-area");
let links = document.querySelectorAll(".landing-page .header-area ul li a");
let randomBackground = document.querySelectorAll(".options-box .random-background span");
let showBullets = document.querySelectorAll(".options-box .show-bullets span");
let showHeaderSwitch = document.querySelectorAll(".options-box .scroll-nav span");
let ourSkills = document.querySelector(".skills");
let progress = document.querySelectorAll(".skills .container .skill-box .skill-progress span");
let resetBtn = document.querySelector(".reset-button");
let toggleMenu = document.querySelector(".landing-page .header-area .toggle");



//variables
let checkRandomBackground = true;
let switchBackground;
let randomImg = 1;


createBullets();


//checking on localStorage

if (localStorage.getItem("main-color") != null) {

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("main-color"));
    
    //add active class on the chosen color
    colorsLi.forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === localStorage.getItem("main-color")) {

        li.classList.add("active");
    }
    })
    
}

if (localStorage.getItem("randomBackground") != null) {
    
    if (localStorage.getItem("randomBackground") === "no"){

        checkRandomBackground = false;

        randomizeImgs();

        document.querySelector(".options-box .random-background .no").classList.add("active");
    } else {

        //set the background state on the state from localStorage
        checkRandomBackground = true;

        randomizeImgs();

        document.querySelector(".options-box .random-background .yes").classList.add("active");
    }
} else {
    //default sitting is background random
    document.querySelector(".options-box .random-background .yes").classList.add("active");
    randomizeImgs();
    }

if (localStorage.getItem("the-image") !== null) {
    landingPage.style.backgroundImage = 'url(img/' + localStorage.getItem("the-image") + '.jpg)';
} else {
    //default sitting is start from first background
    landingPage.style.backgroundImage = 'url(img/' + randomImg + '.jpg)';
}
    
if (localStorage.getItem("show-bullets") === "no") {

    document.querySelector(".options-box .show-bullets .yes").classList.remove("active");

    document.querySelector(".options-box .show-bullets .no").classList.add("active");

    document.querySelector(".nav-bullets").style.display = "none";
} else {
    document.querySelector(".nav-bullets").style.display = "block";
    document.querySelector(".options-box .show-bullets .yes").classList.add("active");
}

if (localStorage.getItem("Header-scroll") === "no") {

    document.querySelector(".options-box .scroll-nav .yes").classList.remove("active");

    document.querySelector(".options-box .scroll-nav .no").classList.add("active");

    header.style.position = "relative";
    
} else {

    header.style.position = "fixed";

    document.querySelector(".options-box .scroll-nav .yes").classList.add("active");
}


//Open sitting Box Function
controller.addEventListener("click", () => {
    //To make Left 200px to show the sittings box
    document.querySelector(".sittings-box").classList.toggle("open");

    //Toggle Class Fa spin For Rotation on Self
    controller.classList.toggle("fa-spin");
});

//Loop on All List Items
colorsLi.forEach((li) => {
    //Click on every List Items
    li.addEventListener("click", (e) => {
        
        removeAddActive(e)
        //Set color on root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        //save the chosen color in localStorage
        window.localStorage.setItem("main-color", `${e.target.dataset.color}`);
    })
}) 


//changing background image function
function randomizeImgs() {
    if (checkRandomBackground === true) {
        switchBackground = setInterval(() => {
            //get random number
            randomImg = Math.floor(Math.random() * 5);
            //change the background image
            landingPage.style.backgroundImage = 'url(img/' + randomImg + '.jpg)';
        }, 10000);
    } else {
        clearInterval(switchBackground);
    }
    
}

//looping on background buttons
randomBackground.forEach((span) => {
    span.addEventListener("click", (e) => {
        //remove active class from all buttons
        removeAddActive(e);

        //checking on the state of the chosen button
        if (e.target.classList.contains("yes")) {
            //to make the background be randomize
            checkRandomBackground = true
            randomizeImgs();
        } else {
            //stop randomize the background
            checkRandomBackground = false
            randomizeImgs();
            localStorage.setItem("the-image", randomImg);
        }
        //storing background state in localStorage
        localStorage.setItem("randomBackground", e.target.dataset.random);
    })
})

window.onscroll = () => {
    //Skills Offset Top => the distance from the top to the section beginning
    let skillsOffsetTop = ourSkills.offsetTop;
    //Skills Offset Height => the Height of Skills Section
    let skillsOuterHeight = ourSkills.offsetHeight;
    //Height of the view screen
    let windowHeight = window.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        progress.forEach((span) => {
            span.style.width = `${span.dataset.width}`;
        })
    }
    
}
//Create Popup With The image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        //Create popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt !== null) {
            //create Heading
            let imageHeading = document.createElement("h3");
            //create Text For Heading 
            imageHeading.innerHTML = img.alt;
            //Append The Heading To the Popup Box
            popupBox.appendChild(imageHeading);
        }

        //create the image
        let popupImage = document.createElement("img")
        //Set Image Source
        popupImage.src = img.src;
        
        //Add image to popup box
        popupBox.appendChild(popupImage);
        //Add Popup Box to body
        document.body.appendChild(popupBox);
        //Create Close Span 
        let closeSpan = document.createElement("span");
        closeSpan.classList = "close-span";
        closeSpan.innerHTML = "X";
        popupBox.appendChild(closeSpan);
        closeSpan.onclick = () => {
            closeSpan.parentNode.remove();
            document.querySelector(".popup-overlay").remove();
        }
        
    })
})


function scrollToSomeWhere(element) {
    element.forEach((ele) => {
        ele.addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        })
    })
}

//select all bullets
const bullets = document.querySelectorAll(".nav-bullets .bullets");

//Move to Links
scrollToSomeWhere(links);
//move To bullets
scrollToSomeWhere(bullets);

//For Handle Active class
function removeAddActive(ev) {
    ev.target.parentNode.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    })
    ev.target.classList.add("active");
}

showBullets.forEach(span => {
    span.addEventListener("click", (e) => {
        removeAddActive(e);
        if (e.target.dataset.bullets == "no") {
            document.querySelector(".nav-bullets").style.display = "none";
        } else {
            document.querySelector(".nav-bullets").style.display = "block";
        }
        localStorage.setItem("show-bullets", e.target.dataset.bullets);
    })
})

//making bullet foe each section function
function createBullets() {
    let arrayOfSections = Array.from(links);
    let bulletsContainer = document.createElement("div");
    bulletsContainer.className = "nav-bullets";
    let i;
    for (i = 0; i < arrayOfSections.length; i++) {
        let bullet = document.createElement("div");
        bullet.className = "bullets";
        bullet.dataset.section = links[i].dataset.section;
        let tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerHTML = links[i].textContent;
        bullet.appendChild(tooltip);
        bulletsContainer.appendChild(bullet);
    }
    document.body.appendChild(bulletsContainer);
}
//reset the page
resetBtn.onclick = () => {

    localStorage.removeItem("main-color");

    localStorage.removeItem("randomBackground");

    localStorage.removeItem("the-image");

    localStorage.removeItem("show-bullets");
    
    localStorage.removeItem("Header-scroll");

    window.location.reload();
}

toggleMenu.addEventListener("click", (e) => {
    toggleMenu.classList.toggle("menu-active");
    linksContainer.classList.toggle("open");
    e.stopPropagation();

})
document.addEventListener("click", (e) => {
    
    if (e.target !== toggleMenu && e.target !== linksContainer && toggleMenu.classList.contains("menu-active")) {
        toggleMenu.classList.toggle("menu-active");
        linksContainer.classList.toggle("open");
    }
})

linksContainer.onclick = (e) => {
    e.stopPropagation();
} 

function scrolling() {
    window.addEventListener("scroll", () => {
        if (window.scrollY != 0) {
            header.style.backgroundColor = "rgb(0 0 0 / 30%)";
        } else {
            header.style.backgroundColor = "transparent";
        }
    });
}
function scrollNav() {
    showHeaderSwitch.forEach((span) => {
        span.addEventListener("click", (e) => {

            removeAddActive(e);

            if (e.target.dataset.header === "yes") {
                header.style.position = "fixed";
                localStorage.setItem("Header-scroll", e.target.dataset.header);
            } else {
                header.style.position = "relative";
                localStorage.setItem("Header-scroll", e.target.dataset.header);
            }
        })
    })

}
scrolling();
scrollNav();
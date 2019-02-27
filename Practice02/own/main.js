const back = document.getElementById("back");
const next = document.getElementById("next");
const image = document.getElementById("display");
const source = document.getElementById("source");

const urls = [
    "images/pizza01.jpg",
    "https://food-images.files.bbci.co.uk/food/recipes/quick_pepperoni_pizza_64616_16x9.jpg",
    "https://i.imgur.com/AR2SwFPr.jpg",
    "https://d2gk7xgygi98cy.cloudfront.net/20-4-facebook.jpg",
    "http://www.luigispizzasub.com/wp-content/uploads/2016/04/Pizza-capricciosa.jpg"
];
const imgnum = urls.length;

function changeHandler(e) {
    const target = e.currentTarget;
    let index = parseInt(image.dataset.id);
    if (target.id === "back") {
        next.disabled = false;
        if (index > 1) {
            index -= 1;
            if (index === 1) {
                target.disabled = true;
            }
        }
    }
    else if (target.id === "next") {
        back.disabled = false;
        if (index < imgnum) {
            index += 1;
            if (index === imgnum) {
                target.disabled = true;
            }
        }
    }
    // push loading image and message
    image.src = "images/loading.gif";
    image.dataset.id = "0";
    source.textContent = "Loading...";

    indexString = index.toString();
    const path = urls[index - 1];
    let downloading = new Image();
    downloading['path'] = path;
    downloading['id'] = indexString;
    downloading['buttonState'] = [back.disabled, next.disabled];
    back.disabled = true;
    next.disabled = true;
    back.classList.add("disabled");
    next.classList.add("disabled");

    // download image to a tmp image
    let downloadHandler = function () {
        image.src = this.src;
        image.dataset.id = this.id;
        source.textContent = this.path;
        back.disabled = this.buttonState[0];
        next.disabled = this.buttonState[1];
        if (!back.disabled) {
            back.classList.remove("disabled");
        }
        if (!next.disabled) {
            next.classList.remove("disabled");
        }
    }
    downloadHandler = downloadHandler.bind(downloading);
    if (Math.random() < 0.5) {
        // usually we only need this to handle download
        downloading.onload = downloadHandler;
    }
    else {
        // this timeout is not necessary and only for demo
        // to show that the code will run loading.gif on
        // long latency download
        setTimeout(downloadHandler, 500);
    }
    downloading.src = path;
}

back.addEventListener("click", changeHandler);
next.addEventListener("click", changeHandler);
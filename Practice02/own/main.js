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

function clickHandler(e) {
    const target = e.target;
    if (target.id === "display") {
        console.log("pop up image");
    }
    else if (["back", "next"].indexOf(target.id) >= 0) {
        let index = parseInt(image.dataset.id);
        if (target.id === "back") {
            next.className = "";
            next.disabled = false;
            if (index > 1) {
                index -= 1;
                if (index === 1) {
                    target.className = "disabled";
                    target.disabled = true;
                }
            }
        }
        else if (target.id === "next") {
            back.className = "";
            back.disabled = false;
            if (index < imgnum) {
                index += 1;
                if (index === imgnum) {
                    target.className = "disabled";
                    target.disabled = true;
                }
            }
        }
        image.src = "images/loading.gif";
        let downloading = new Image();
        downloading.onload = function(){
            image.src = this.src;
        };
        indexString = index.toString();
        image.dataset.id = indexString;
        const path = urls[index - 1];
        downloading.src = path;
        source.textContent = path;
    }
}

image.addEventListener("click", clickHandler);
back.addEventListener("click", clickHandler);
next.addEventListener("click", clickHandler);
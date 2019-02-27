const back = document.getElementById("back");
const next = document.getElementById("next");
const image = document.getElementById("display");
const source = document.getElementById("source");
const imgnum = parseInt(image.dataset.maxnum);

const urls = [1, 2, 3, 4, 5].map((index) => { 
    return "images/pizza" + index.toString() + ".jpg";
});


function clickHandler(e) {
    const target = e.target;
    if (target.id === "display") {
        console.log("pop up image");
    }
    else if (["back", "next"].indexOf(target.id) >= 0) {
        let index = parseInt(image.dataset.id);
        if (target.id === "back") {
            next.className = "";
            if (index === 1) {
                target.className = "disabled";
                console.log("At left end");
                return;
            }
            else { index -= 1; }
        }
        else if (target.id === "next") {
            back.className = "";
            if (index === imgnum) {
                target.className = "disabled";
                console.log("At right end");
                return;
            }
            else { index += 1; }
        }
        indexString = index.toString();
        image.dataset.id = indexString;
        const path = urls[index - 1];
        image.src = path;
        source.textContent = path;
    }
}

image.addEventListener("click", clickHandler);
back.addEventListener("click", clickHandler);
next.addEventListener("click", clickHandler);
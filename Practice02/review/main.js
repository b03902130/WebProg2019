var source = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Nikon_Logo.svg/1024px-Nikon_Logo.svg.png",
    "https://i.ytimg.com/vi/HPgAWKVB8U8/maxresdefault.jpg", 
    "https://www.coolpix.com.tw/specialsite_img/Z7/new/z6-adapter-side-xl.png",
    "https://www.birdcp.com.tw/wp-content/uploads/2012/10/1379021827-4013364921.jpg",
    "https://static1.squarespace.com/static/589d0203ebbd1a9c437e3c23/58b9105986e6c08fde3ba1c0/5c16cc89aa4a99be1d74d62e/1545087807841/highlow-68.jpg?format=2500w"
];
var loadingImg = "./images/loading.gif"
var alt_name = ["Nikon", "Nikon D600", "Nikon Z6", "Nikon 16-35mm f/4 G ED VR", "Captured by tknorth"];
var caption = [
    "Nikon Corporation is a Japanese multinational corporation headquartered in Tokyo, Japan, specializing in optics and imaging products.",

    "Full model name:	Nikon D600 <br>\
     Resolution:	24.30 Megapixels <br>\
     Sensor size:	35mm <br>\
     (35.9mm x 24.0mm) <br>\
     Kit Lens:	3.54x zoom <br>\
     24-85mm  <br>\
     (24-85mm eq.) <br>\
     Viewfinder:	Optical / LCD <br>\
     Native ISO:	100 - 6400 <br>\
     Extended ISO:	50 - 25,600 <br>\
     Shutter:	1/4000 - 30 sec <br>\
     Max Aperture:	3.5 (kit lens) <br>\
     Dimensions:	5.6 x 4.4 x 3.2 in. <br>\
     (141 x 113 x 82 mm) <br>\
     Weight:	47.6 oz (1,350 g) <br>\
     includes batteries, kit lens <br>\
     Availability:	09/2012 <br>\
     Manufacturer:	Nikon <br>\
     Full specs:	Nikon D600 specifications",
     
     "Full model name:	Nikon Z6 <br>\
     Resolution:	24.50 Megapixels <br>\
     Sensor size:	35mm <br>\
     (35.9mm x 23.9mm) <br>\
     Kit Lens:	2.92x zoom  <br>\
     24-70mm  <br>\
     (24-70mm eq.) <br>\
     Viewfinder:	EVF / LCD <br>\
     Native ISO:	100 - 51,200 <br>\
     Extended ISO:	50 - 204,800 <br>\
     Shutter:	1/8000 - 30 sec <br>\
     Max Aperture:	4.0 (kit lens) <br>\
     Dimensions:	5.3 x 4.0 x 2.7 in. <br>\
     (134 x 101 x 68 mm) <br>\
     Weight:	41.4 oz (1,175 g)  <br>\
     includes batteries, kit lens <br>\
     Availability:	11/2018 <br>\
     Manufacturer:	Nikon <br>\
     Full specs:	Nikon Z6 specifications",

     "The 16-35mm lens was developed to be compatible with full-frame (FX) cameras; \
     on a body equipped with a DX-style sensor, the lens will have an effective field of view of 24-52.5.mm. \
     The lens features a constant f/4 aperture across its range of focal lengths.",

     "TIM NORTHEY // @TK_NORTH <br> Sydney Based Photographer"
];
var link = [
    "https://www.coolpix.com.tw/home",
    "https://www.imaging-resource.com/PRODS/nikon-d600/nikon-d600A.HTM",
    "https://www.imaging-resource.com/PRODS/nikon-z6/nikon-z6A.HTM",
    "https://www.imaging-resource.com/lenses/nikon/16-35mm-f4g-ed-vr-ii-af-s-nikkor/review/",
    "https://www.tknorth.com"
]
var cnt = 0;
var isLoad = [true]; for(i = 1; i < alt_name.length ; ++i) isLoad[i] = false;
var forward  = document.getElementById("right_button");
var backward = document.getElementById("left_button");
var linkTag  = document.getElementById("link");
var photo = document.getElementById("photo");
var photoCap = document.getElementById("figcaption");
var imgCaption  = document.getElementById("image_caption");

forward.onclick = async function(){ 
    if(cnt+1 < alt_name.length){
        backward.className = "image-viewer__button";
        ++cnt;
        linkTag.href = link[cnt];
        
        if(!isLoad[cnt]){
            photo.style.height = "200px";
            photo.src = loadingImg;
            await sleep(2000);
            isLoad[cnt] = true;
        }
        photo.src = source[cnt];
        photo.style.height = "700px";
        photo.alt = alt_name[cnt];
        photoCap.innerHTML = alt_name[cnt];
        imgCaption.innerHTML = caption[cnt];

        if(cnt + 1 == alt_name.length)
            forward.className = "disabled image-viewer__button";
    }
    else alert("This is the last photo");
}
backward.onclick = function(){
    if(cnt-1 >= 0){
        forward.className  = "image-viewer__button";
        --cnt;
        linkTag.href = link[cnt];
        photo.src = loadingImg;
        photo.src = source[cnt];
        photo.alt = alt_name[cnt];
        photoCap.innerHTML = alt_name[cnt];
        imgCaption.innerHTML = caption[cnt];
        
        if(cnt == 0) backward.className = "image-viewer__button disabled";
    }
    else alert("This is the first photo");
}
photo.onmouseenter = function(){
    photo.title = "Click the image to see more details!";
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

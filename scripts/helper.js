var img_loads = 0;

function upgradeImage(object, hq_src) {
    //object.style.backgroundImage = "url(" + lq_src + ")";
    var all_imgs = document.getElementsByClassName("upgradeImage");
    object.parentNode.style.backgroundImage = "url(" + object.src + ")";
    object.innerHTML = hq_src;
    img_loads+= 1;
    if (all_imgs.length == img_loads) {
        // upgrade all images
        for (let i = 0; i < all_imgs.length; i++) {
            // load hq image for all
            all_imgs[i].src = all_imgs[i].innerHTML;
        }
    }
}
function upgradeImage(object) {
    var id = object.id;
    var target = "div_" + id.substring(4);

    document.getElementById(target).style.backgroundImage = "url(" + object.src + ")";
}
(function() {
    const parallax_scale = 1.2;

    // *Grabs mouse*, mine now MAWHAHAHAH
    document.addEventListener("mousemove", parallax);
    const elems = document.querySelectorAll(".parallax");
    let newImg = [];
    let scales = [];

    for (let i = 0; i < elems.length; i++) {

        var css = elems[i].style.backgroundImage;
        var img = css.replace(/(?:^url\(["']?|["']?\)$)/g, "");

        elems[i].style.backgroundSize = "cover";

        newImg.push(new Image());
        scales.push(1.0);
        newImg[i].src = img;

        newImg[i].onload = function(e) {
            for (let i = 0; i < elems.length; i++) {
                var css = elems[i].style.backgroundImage;
                var img = css.replace(/(?:^url\(["']?|["']?\)$)/g, "");
                var compare1 = "/"+this.src.replace("//", "").split("/").slice(1).join("/");
                var compare2 = "/"+img.replace("//", "").split("/").slice(1).join("/");
                if (compare2 == compare1) {
                    var width_m = elems[i].offsetWidth / this.naturalWidth;
                    var height_m = elems[i].offsetHeight / this.naturalHeight;
                    var scale = Math.max(width_m, height_m)*parallax_scale;
                    scales[i] = [scale*this.naturalWidth, scale*this.naturalHeight];
                    elems[i].style.backgroundSize = `${scale*this.naturalWidth}px`;
                    break;
                }
            }
        }
    }

    // JIGGLYYYY!!
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _bpw = 50 - (e.clientX - _w)/_w * -30;
        let _bph = 50 - (e.clientY - _h)/_h * -30;
        var nw = ((e.clientX - _w)/_w);
        var nh = ((e.clientY - _h)/_h);

        for (let i = 0; i < elems.length; i++) {
            //elems[i].style.backgroundPosition = `${_bpw}% ${_bph}%`;
            if (elems[i].style.backgroundSize == "cover") {
                var css = elems[i].style.backgroundImage;
                var img = css.replace(/(?:^url\(["']?|["']?\)$)/g, "");
                newImg[i].src = img;
            }
            else {
                let bpw = (elems[i].parentElement.offsetWidth - scales[i][0])/2;
                let bph = (elems[i].parentElement.offsetHeight - scales[i][1])/2;

                offset = [0,0];
                if (bpw > bph) {
                    offset = [bpw+bpw*nw,bph+bpw*nh];
                }
                else {
                    offset = [bpw+bph*nw,bph+bph*nh];
                }

                elems[i].style.backgroundPosition = `${offset[0]}px ${offset[1]}px`;
            }
        }
    }

})();
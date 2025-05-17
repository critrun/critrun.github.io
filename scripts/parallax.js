(function() {
    // *Grabs mouse*, mine now MAWHAHAHAH
    document.addEventListener("mousemove", parallax);
    const elems = document.querySelectorAll(".parallax");

    // JIGGLYYYY!!
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _bpw = 50 - (e.clientX - _w)/_w * -30;
        let _bph = 50 - (e.clientY - _h)/_h * -30;

        for (let i = 0; i < elems.length; i++) {
            elems[i].style.backgroundPosition = `${_bpw}% ${_bph}%`;
            let largerAxis = Math.max(elems[i].offsetWidth, elems[i].offsetHeight);
            elems[i].style.backgroundSize = `calc(${largerAxis}px + 20%)`;
        }
    }

})();
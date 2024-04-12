(function() {
    // *Grabs mouse*, mine now MAWHAHAHAH
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#parallax");
    const elem1 = document.querySelector("#mover");
    // JIGGLYYYY!!
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        elem.style.backgroundPosition = `${50 - (e.clientX - _w) * -0.01}% ${50 - (e.clientY - _h) * -0.01}%`;
        elem1.style.left =  `${- (e.clientX - _w) * -0.001}vh`;
        elem1.style.top =  `${- (e.clientY - _h) * -0.001}vh`;
    }

})();
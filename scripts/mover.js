(function() {
    // *Grabs mouse*, mine now MAWHAHAHAH
    document.addEventListener("mousemove", mover);
    var elem = document.querySelector("#mover");
    if (!elem) {
        elem = document.querySelector("#mover-scroll");
    }
    // JIGGLYYYY!!
    function mover(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        elem.style.left =  `${- (e.clientX - _w) * -0.001}vw`;
        elem.style.top =  `${- (e.clientY - _h) * -0.001}vh`;
    }

})();
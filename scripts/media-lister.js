function loadMediaGallery(jsonPath) {
  const container = document.getElementById('media-container');
  var media_path = jsonPath.split('/')
  media_path.pop();
  media_path = media_path.join('/');
  var grid = document.querySelector('.media-container');

  fetch(jsonPath)
    .then(res => res.json())
    .then(files => {
      container.innerHTML = ''; // Clear "Loading..."

      files.forEach(file => {
        const ext = file.split('.').pop().toLowerCase();
        const name = file.split('.')[0];
        const wrapper = document.createElement('div');
        const wrapper2 = document.createElement('div');
        wrapper2.classList.add('sidelamp');
        wrapper.classList.add('parallax');
        wrapper.classList.add('media-item');
        wrapper2.classList.add('articlebox');
        wrapper2.classList.add('rounded');


        if (['mp4', 'webm', 'ogg'].includes(ext)) {
          wrapper.style.backgroundImage = 'url("'+media_path+'/tn/'+name+'.webp'+'")';
          const play_triangle = document.createElement("span");
          play_triangle.textContent = "\u2023";
          play_triangle.style.fontSize = "6em";
          play_triangle.style.textShadow = "0px 0px 0.05em rgba(81,98,104,0.51)"
          wrapper.appendChild(play_triangle);
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
          wrapper.fetchPriority = "high";
          var lq_im = document.createElement('img');
          lq_im.classList.add("upgradeImage");
          lq_im.src = media_path+'/lq/'+file;
          lq_im.fetchPriority = "high";
          lq_im.setAttribute("onload", "upgradeImage(this, '"+media_path+'/'+file+"')");
          wrapper.appendChild(lq_im);
        }

        wrapper.style.backgroundRepeat = 'no-repeat';

        parallax = document.createElement('script');
        parallax.src='/scripts/parallax.js';
        wrapper.appendChild(parallax);

        if (wrapper) {
          wrapper2.appendChild(wrapper);
          container.appendChild(wrapper2);
        }
      });

      if (files.length === 0) {
        container.textContent = 'No media found.';
      }

      /*var msnry = new Masonry( grid, {
        itemSelector: '.media-wrapper',
        columnWidth: 100,
        percentPosition: false,
        fitWidth: true,
        margin: 1
      });

      imagesLoaded( grid ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });*/

    })
    .catch(err => {
      console.error(err);
      container.textContent = 'Error loading media.';
    });
}
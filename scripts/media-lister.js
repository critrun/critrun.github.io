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
        wrapper.classList.add('media-wrapper');

        let element;

        if (['mp4', 'webm', 'ogg'].includes(ext)) {
          element = document.createElement('video');
          element.controls = true;
          element.poster = media_path+'/tn/'+name+'.webp';
        } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
          element = document.createElement('img');
        }

        if (element) {
          element.src = media_path+'/'+file;
          element.classList.add('media-item');
          wrapper.appendChild(element);
          container.appendChild(wrapper);
        }
      });

      if (files.length === 0) {
        container.textContent = 'No media found.';
      }

      var msnry = new Masonry( grid, {
        itemSelector: '.media-wrapper',
        columnWidth: 100,
        percentPosition: false,
        fitWidth: true,
        margin: 1
      });

      imagesLoaded( grid ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });

    })
    .catch(err => {
      console.error(err);
      container.textContent = 'Error loading media.';
    });
}
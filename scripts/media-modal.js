document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('media-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  
  // Open modal when media is clicked
  document.getElementById('media-container').addEventListener('click', e => {
    const wrapper = e.target.closest('.media-item');
    if (!wrapper) return;

    // Clone the media node (image or video)
    //const media = wrapper.querySelector('img, video');
    var media;

    var path = wrapper.style.backgroundImage.replace(/(?:^url\(["']?|["']?\)$)/g, "");
    if (path.includes("/tn/")) {
        path = path.replace("/tn/", "/").replace(".webp", ".webm");
        var media = document.createElement("video");
        media.setAttribute("src", path);
        media.setAttribute("controls", "");
        media.setAttribute("poster", wrapper.style.backgroundImage.replace(/(?:^url\(["']?|["']?\)$)/g, ""));
    }
    else {
        media = new Image();
        media.src = path;
    }

    if (!media) return;

    const clone = media.cloneNode(true);
    clone.removeAttribute('style'); // Remove masonry sizing
    clone.removeAttribute('width');
    clone.removeAttribute('height');

    modalContent.innerHTML = ''; // Clear previous content
    modalContent.appendChild(clone);

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalContent.innerHTML = '';
    document.body.classList.remove('modal-open');
  });

  // Optional: click outside the content to close
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });
});

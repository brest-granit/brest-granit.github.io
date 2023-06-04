var categories = [
  [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ],
  [
    'image4.jpg',
    'image5.jpg',
    'image6.jpg'
  ],
  [
    'image7.jpg',
    'image8.jpg',
    'image9.jpg'
  ]
];

var currentCategory = 0;
var currentImageIndex = 0;
var isModalOpen = false;

function changeCategory(categoryIndex) {
  var buttons = document.getElementsByClassName('category-button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  buttons[categoryIndex].classList.add('active');
  currentCategory = categoryIndex;
  currentImageIndex = 0;
  showCurrentImage();
}

function changeImage(delta) {
  currentImageIndex += delta;

  if (currentImageIndex < 0) {
    currentImageIndex = categories[currentCategory].length - 1;
  } else if (currentImageIndex >= categories[currentCategory].length) {
    currentImageIndex = 0;
  }

  showCurrentImage();
}

function changeModalImage(delta) {
  currentImageIndex += delta;

  if (currentImageIndex < 0) {
    currentImageIndex = categories[currentCategory].length - 1;
  } else if (currentImageIndex >= categories[currentCategory].length) {
    currentImageIndex = 0;
  }

  showCurrentModalImage();
}

function showCurrentImage() {
  var image = document.getElementById('current-image');
  image.src = categories[currentCategory][currentImageIndex];
}

function showCurrentModalImage() {
  var modalImage = document.getElementById('modal-image');
  modalImage.src = categories[currentCategory][currentImageIndex];
}

function openModal() {
  var modal = document.getElementById('modal');
  var modalImage = document.getElementById('modal-image');
  var currentImage = document.getElementById('current-image').src;
  
  modal.style.display = 'flex';
  modalImage.src = currentImage;
  isModalOpen = true;
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
  isModalOpen = false;
}

function toggleFullscreen() {
  if (isModalOpen) {
    var modalImage = document.getElementById('modal-image');
    if (modalImage.requestFullscreen) {
      modalImage.requestFullscreen();
    } else if (modalImage.mozRequestFullScreen) {
      modalImage.mozRequestFullScreen();
    } else if (modalImage.webkitRequestFullscreen) {
      modalImage.webkitRequestFullscreen();
    } else if (modalImage.msRequestFullscreen) {
      modalImage.msRequestFullscreen();
    }
  }
}

document.getElementById('current-image').addEventListener('click', openModal);
document.getElementById('close-button').addEventListener('click', closeModal);
document.getElementById('modal-prev-button').addEventListener('click', function (e) {
  e.stopPropagation();
  changeModalImage(-1);
});
document.getElementById('modal-next-button').addEventListener('click', function (e) {
  e.stopPropagation();
  changeModalImage(1);
});
document.getElementById('modal-image').addEventListener('click', toggleFullscreen);

changeCategory(0);
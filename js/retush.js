var categories = [
  [
    'img/photo_rabot/retush (1).png',
    'img/photo_rabot/retush (2).png',
    'img/photo_rabot/retush (3).png',
    'img/photo_rabot/retush (4).png',
    'img/photo_rabot/retush (5).png',
    'img/photo_rabot/retush (6).png',
    'img/photo_rabot/retush (7).png',
    'img/photo_rabot/retush (8).png',
    'img/photo_rabot/retush (9).png'
  ],
  [

  ],
  [

  ],
  [

  ],
];

var currentCategory = 0;
var currentImageIndex = 0;
var isModalOpen = false;

function changeCategory(categoryIndex) {
  var buttons = document.getElementsByClassName('pamButtonNavigation');
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
  showCurrentImage(); // Обновляем маленькое изображение
}

document.getElementById('current-image').addEventListener('click', function(e) {
  if (isModalOpen) {
    closeModal();
  } else {
    openModal();
  }
});

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target.id === 'modal') {
    closeModal();
  }
});

document.getElementById('modal-prev-button').addEventListener('click', function(e) {
  e.stopPropagation();
  changeModalImage(-1);
});

document.getElementById('modal-next-button').addEventListener('click', function(e) {
  e.stopPropagation();
  changeModalImage(1);
});

changeCategory(0);

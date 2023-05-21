var galleries = document.querySelectorAll('.gallery');
var galleryContainer = document.querySelector('.gallery-container');

var activeGalleryIndex = 0;
showGallery(activeGalleryIndex + 1);

function showGallery(index) {
  activeGalleryIndex = index - 1;

  for (var i = 0; i < galleries.length; i++) {
    if (i === activeGalleryIndex) {
      galleries[i].classList.add('active-gallery');
    } else {
      galleries[i].classList.remove('active-gallery');
    }
  }

  galleryContainer.classList.add('open');
  setTimeout(function() {
    galleryContainer.style.height = galleryContainer.scrollHeight + 'px';
  }, 0);

  var thumbnails = galleries[activeGalleryIndex].querySelectorAll('.thumbnail');
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.remove('selected');
    thumbnails[i].removeEventListener('click', thumbnailClickHandler);
    thumbnails[i].addEventListener('click', thumbnailClickHandler);
  }

  thumbnails[0].classList.add('selected');

  var mainImageContainer = galleries[activeGalleryIndex].querySelector('#main-image-container');
  mainImageContainer.removeEventListener('mousemove', followCursor);
  mainImageContainer.removeEventListener('touchstart', followCursor, { passive: true });
  mainImageContainer.removeEventListener('touchmove', followCursor, { passive: true });
  mainImageContainer.addEventListener('mousemove', followCursor);
  mainImageContainer.addEventListener('touchstart', followCursor, { passive: true });
  mainImageContainer.addEventListener('touchmove', followCursor, { passive: true });

  var mainImage = mainImageContainer.querySelector('#main-image');
  var firstThumbnail = thumbnails[0];
  var imageUrl = firstThumbnail.getAttribute('data-image-url');
  changeImage(firstThumbnail, imageUrl);
}

function changeImage(element, imageUrl) {
  var mainImageContainer = galleries[activeGalleryIndex].querySelector('#main-image-container');
  var mainImage = mainImageContainer.querySelector('#main-image');

  mainImage.classList.add('fade-out');

  setTimeout(function() {
    mainImage.src = imageUrl;
    mainImage.classList.remove('fade-out');
  }, 300);

  var thumbnails = galleries[activeGalleryIndex].querySelectorAll('.thumbnail');
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].classList.remove('selected');
  }

  element.classList.add('selected');
}

function thumbnailClickHandler() {
  var imageUrl = this.getAttribute('data-image-url');
  changeImage(this, imageUrl);
}

var thumbnails = galleries[activeGalleryIndex].querySelectorAll('.thumbnail');
for (var i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener('click', thumbnailClickHandler);
}

thumbnails[0].classList.add('selected');

function followCursor(event) {
  var mainImageContainer = galleries[activeGalleryIndex].querySelector('#main-image-container');
  var mainImage = mainImageContainer.querySelector('#main-image');

  var containerRect = mainImageContainer.getBoundingClientRect();
  var offsetX, offsetY;

  if (event.type === 'mousemove') {
    offsetX = event.clientX - containerRect.left;
    offsetY = event.clientY - containerRect.top;
  } else if (event.type === 'touchmove') {
    offsetX = event.touches[0].clientX - containerRect.left;
    offsetY = event.touches[0].clientY - containerRect.top;
  }

  var containerWidth = mainImageContainer.offsetWidth;
  var containerHeight = mainImageContainer.offsetHeight;

  var xPercentage = (offsetX / containerWidth) * 100;
  var yPercentage = (offsetY / containerHeight) * 100;

  mainImage.style.transformOrigin = `${xPercentage}% ${yPercentage}%`;
}

var galleryThumbnailsContainer = document.querySelector('.gallery-thumbnails-container');
var prevThumbnailBtn = document.getElementById('prev-thumbnail-btn');
var nextThumbnailBtn = document.getElementById('next-thumbnail-btn');

prevThumbnailBtn.addEventListener('click', function () {
  galleryThumbnailsContainer.scrollBy({
    top: -306,
    behavior: 'smooth',
  });
});

nextThumbnailBtn.addEventListener('click', function () {
  galleryThumbnailsContainer.scrollBy({
    top: 306,
    behavior: 'smooth',
  });
});

var galleryThumbnailsContainer = document.querySelector('.gallery-thumbnails-container');
var prevThumbnailBtn = document.getElementById('prev-thumbnail-btn');
var nextThumbnailBtn = document.getElementById('next-thumbnail-btn');

var isScrolling = false;
var scrollTimeout;
var scrollDuration = 200; // Продолжительность прокрутки в миллисекундах
var scrollIncrement = 100; // Значение инкремента прокрутки

prevThumbnailBtn.addEventListener('click', function() {
  scrollThumbnails(-307); // Значение для прокрутки назад
  
});

nextThumbnailBtn.addEventListener('click', function() {
  scrollThumbnails(307); // Значение для прокрутки вперед
});

galleryThumbnailsContainer.addEventListener('scroll', function() {
  var scrollTop = galleryThumbnailsContainer.scrollTop;
  var maxScrollTop = galleryThumbnailsContainer.scrollHeight - galleryThumbnailsContainer.clientHeight;

  prevThumbnailBtn.style.opacity = scrollTop > 0 ? 1 : 0;
  prevThumbnailBtn.style.pointerEvents = scrollTop > 0 ? 'auto' : 'none';

  nextThumbnailBtn.style.opacity = scrollTop < maxScrollTop ? 1 : 0;
  nextThumbnailBtn.style.pointerEvents = scrollTop < maxScrollTop ? 'auto' : 'none';
});

function scrollThumbnails(deltaY) {
  if (isScrolling) {
    return;
  }

  isScrolling = true;
  var startScrollTop = galleryThumbnailsContainer.scrollTop;
  var targetScrollTop = startScrollTop + deltaY;
  var startTime = performance.now();

  function animateScroll(currentTime) {
    var elapsedTime = currentTime - startTime;
    var easing = easeInOutQuad(elapsedTime / scrollDuration);
    var scrollTop = startScrollTop + (targetScrollTop - startScrollTop) * easing;

    galleryThumbnailsContainer.scrollTop = scrollTop;

    if (elapsedTime < scrollDuration) {
      requestAnimationFrame(animateScroll);
    } else {
      isScrolling = false;
    }
  }

  requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updateThumbnailButtonsVisibility() {
  var scrollTop = galleryThumbnailsContainer.scrollTop;
  var scrollHeight = galleryThumbnailsContainer.scrollHeight;
  var containerHeight = galleryThumbnailsContainer.offsetHeight;

  if (scrollTop === 0) {
    fadeOut(prevThumbnailBtn);
  } else {
    fadeIn(prevThumbnailBtn);
  }

  if (scrollTop + containerHeight >= scrollHeight) {
    fadeOut(nextThumbnailBtn);
  } else {
    fadeIn(nextThumbnailBtn);
  }
}

function fadeIn(element) {
  element.style.opacity = '1';
  element.style.pointerEvents = 'auto';
}

function fadeOut(element) {
  element.style.opacity = '0';
  element.style.pointerEvents = 'none';
}

galleryThumbnailsContainer.addEventListener('scroll', function() {
  updateThumbnailButtonsVisibility();
});

// Проверяем видимость кнопок при загрузке страницы
updateThumbnailButtonsVisibility();

var categoryButtons = document.querySelectorAll('.category-button');
var thumbnails = document.querySelectorAll('.thumbnail');

for (var i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].addEventListener('click', filterThumbnails);
}

function filterThumbnails() {
  var category = this.getAttribute('data-category');

  for (var i = 0; i < thumbnails.length; i++) {
    var thumbnail = thumbnails[i];
    var thumbnailCategory = thumbnail.getAttribute('data-category');

    if (thumbnailCategory === category) {
      thumbnail.style.display = 'block';
    } else {
      thumbnail.style.display = 'none';
    }
  }
}


// Dress code: slider through the palette images.

export function initDressSlider() {
  var track = document.getElementById("dressTrack");
  var dots = document.querySelectorAll(".dress-dot");

  if (!track) return;

  var index = 0;
  var total = track.children.length;
  var autoSlide = true;

  function update() {
    track.style.transform = "translateX(" + -index * 100 + "%)";

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
    });
  }

  // Automatic sliding every 1.2 seconds
  var interval = setInterval(function () {
    if (!autoSlide) return;

    index = (index + 1) % total;
    update();
  }, 1200);

  // Dot navigation
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      autoSlide = false;
      clearInterval(interval);

      index = parseInt(dot.dataset.index, 10);
      update();
    });
  });

  // Swipe / drag support
  var startX = null;
  var isDragging = false;

  track.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    function (e) {
      if (!isDragging || startX === null) return;

      var endX = e.changedTouches[0].clientX;
      var diff = endX - startX;

      // Stop automatic sliding once the user interacts
      if (Math.abs(diff) > 40) {
        autoSlide = false;
        clearInterval(interval);

        if (diff > 0) {
          // Swipe right → previous
          index = (index - 1 + total) % total;
        } else {
          // Swipe left → next
          index = (index + 1) % total;
        }

        update();
      }

      startX = null;
      isDragging = false;
    },
    { passive: true },
  );

  update();
}

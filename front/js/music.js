// Background music with a mute / unmute button.
//
// Browsers don't allow sound until the visitor interacts with the page, so the
// music tries to start right away and, if blocked, starts on the first tap,
// click or key press. The button icon always reflects what is really happening.

export function initMusic() {
  var audio = document.getElementById("bgMusic");
  var button = document.getElementById("musicBtn");
  if (!audio || !button) return;

  audio.volume = 0.5;

  function render() {
    var soundOn = !audio.paused && !audio.muted;
    button.classList.toggle("is-on", soundOn);
    button.setAttribute(
      "aria-label",
      soundOn ? "Mute music" : audio.paused ? "Play music" : "Unmute music",
    );
  }

  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);
  audio.addEventListener("volumechange", render);

  // Start on the first interaction anywhere (the button handles its own clicks)
  var unlockEvents = ["pointerdown", "keydown", "touchend"];

  function removeUnlock() {
    unlockEvents.forEach(function (name) {
      document.removeEventListener(name, unlock);
    });
  }

  function unlock(e) {
    if (e.target.closest && e.target.closest("#musicBtn")) return;
    audio.play().then(removeUnlock).catch(function () {});
  }

  unlockEvents.forEach(function (name) {
    document.addEventListener(name, unlock);
  });

  // Try to start immediately (works if the browser allows autoplay)
  audio.play().then(removeUnlock).catch(function () {});

  button.addEventListener("click", function () {
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(function () {});
    } else {
      audio.muted = !audio.muted;
    }
  });

  render();
}

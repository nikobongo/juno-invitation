// RSVP: the letter shakes when clicked, then opens the RSVP form in a new tab.

export function initRsvp() {
  var letter = document.querySelector(".rsvp-letter");
  if (!letter) return;

  var SHAKE_TIME = 600; // must match the rsvp-shake duration in rsvp.css
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var busy = false;

  function openForm() {
    var tab = window.open(letter.href, "_blank");
    if (tab) {
      tab.opener = null;
    } else {
      // Pop-up blocked: open the form in this tab instead
      window.location.href = letter.href;
    }
  }

  letter.addEventListener("click", function (e) {
    // Let ctrl/cmd/shift/middle clicks behave like a normal link
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();
    if (busy) return;

    if (reduceMotion) {
      openForm();
      return;
    }

    busy = true;
    letter.classList.add("is-shaking");

    setTimeout(function () {
      letter.classList.remove("is-shaking");
      busy = false;
      openForm();
    }, SHAKE_TIME);
  });
}

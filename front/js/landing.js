// Landing page: animated background, and the pony that "pukes" a rainbow
// when the screen is tapped, then opens the invitation.

(function () {
  var NEXT_PAGE = "body.html"; // the invitation (same folder as landing.html)
  var NAVIGATE_DELAY = 1500; // wait for the rainbow wave to cover the screen

  var bgLayer = document.getElementById("bgLayer");
  var pony = document.getElementById("ponyWrap");
  var ponyImg = document.getElementById("ponyImg");
  var pukeWave = document.getElementById("pukeWave");

  var tapped = false;
  var ponySrc = ponyImg.getAttribute("src");

  // ---------- Background: clouds and sparkles ----------

  function makeCloud(top, scale, duration, delay) {
    var cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.style.top = top + "%";
    cloud.style.left = "0";
    cloud.style.animationDuration = duration + "s";
    cloud.style.animationDelay = delay + "s";
    cloud.innerHTML = `
      <svg width="${120 * scale}" height="${60 * scale}" viewBox="0 0 120 60">
        <ellipse cx="30" cy="40" rx="28" ry="18" fill="white" />
        <ellipse cx="55" cy="28" rx="32" ry="22" fill="white" />
        <ellipse cx="85" cy="38" rx="26" ry="17" fill="white" />
        <ellipse cx="60" cy="45" rx="45" ry="15" fill="white" />
      </svg>
    `;
    return cloud;
  }

  function makeSparkle(left, top, size, duration, delay, color) {
    var sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = left + "%";
    sparkle.style.top = top + "%";
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 ${size}px ${color}`;
    sparkle.style.animationDuration = duration + "s";
    sparkle.style.animationDelay = delay + "s";
    return sparkle;
  }


  // Clouds at varying heights, sizes and speeds
  var cloudConfigs = [
    { top: 8, scale: 1.1, duration: 55, delay: 0 },
    { top: 18, scale: 0.8, duration: 70, delay: -20 },
    { top: 28, scale: 1.3, duration: 65, delay: -40 },
    { top: 5, scale: 0.7, duration: 48, delay: -10 },
    { top: 35, scale: 0.9, duration: 60, delay: -30 },
  ];
  cloudConfigs.forEach(function (c) {
    bgLayer.appendChild(makeCloud(c.top, c.scale, c.duration, c.delay));
  });

  // Sparkles scattered around, in pastel colors
  var sparkleColors = ["#ffffff", "#ffd1f0", "#d1f0ff", "#fff6c9", "#e0d1ff"];
  for (var i = 0; i < 25; i++) {
    bgLayer.appendChild(
      makeSparkle(
        Math.random() * 100,
        Math.random() * 100,
        4 + Math.random() * 6,
        2 + Math.random() * 3,
        Math.random() * 4,
        sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      ),
    );
  }

  // ---------- Tap interaction ----------

  var splatColors = ["#7CFC00", "#00E5FF", "#FF6EC7", "#FFD84D", "#B57CFF"];

  // Load the "puke" pony ahead of time so the swap has no flicker
  new Image().src = ponyImg.dataset.pukeSrc;

  function createScreenSplat() {
    var size = 100 + Math.random() * 140;
    var x = Math.random() * (window.innerWidth - size);
    var y = Math.random() * (window.innerHeight - size);
    var rot = Math.random() * 360;
    var color = splatColors[Math.floor(Math.random() * splatColors.length)];
    var color2 = splatColors[Math.floor(Math.random() * splatColors.length)];

    var splat = document.createElement("div");
    splat.className = "screen-splat";
    splat.style.left = x + "px";
    splat.style.top = y + "px";
    splat.style.setProperty("--rot", rot + "deg");
    splat.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100">
        <path d="M50 5 Q75 15 85 40 Q95 60 75 75 Q60 95 40 85 Q15 90 10 65 Q0 45 20 30 Q25 10 50 5 Z" fill="${color}" />
        <circle cx="30" cy="30" r="8" fill="${color2}" />
        <circle cx="70" cy="60" r="6" fill="${color2}" />
      </svg>
    `;

    document.body.appendChild(splat);
    requestAnimationFrame(function () {
      splat.classList.add("pop");
    });

    setTimeout(function () {
      splat.remove();
    }, 2500);
  }

  function handleScreenTap() {
    if (tapped) return; // only react to the first tap
    tapped = true;

    ponyImg.src = ponyImg.dataset.pukeSrc;

    pony.classList.remove("active");
    void pony.offsetWidth; // restart the squish animation
    pony.classList.add("active");

    // Scatter splats around the screen
    for (var i = 0; i < 50; i++) {
      setTimeout(createScreenSplat, i * 30);
    }

    // The rainbow wave starts from the pony's mouth
    var rect = pony.getBoundingClientRect();
    pukeWave.style.setProperty("--ox", rect.left + rect.width / 2 + "px");
    pukeWave.style.setProperty("--oy", rect.top + rect.height * 0.6 + "px");

    pukeWave.classList.remove("active");
    void pukeWave.offsetWidth;
    pukeWave.classList.add("active");

    // Open the invitation once the wave has covered the screen
    setTimeout(function () {
      window.location.href = NEXT_PAGE;
    }, NAVIGATE_DELAY);
  }

  // Going Back to this page restores it exactly as it was left (wave and splats
  // still on screen), so put everything back to the starting state.
  function resetPage() {
    tapped = false;
    ponyImg.src = ponySrc;
    pony.classList.remove("active");
    pukeWave.classList.remove("active");
    document.querySelectorAll(".screen-splat").forEach(function (splat) {
      splat.remove();
    });
  }

  window.addEventListener("pageshow", function (e) {
    if (e.persisted) resetPage();
  });

  document.body.addEventListener("click", handleScreenTap);
})();

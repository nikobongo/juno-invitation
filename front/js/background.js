// Background: flying Rainbow Dash and the shakeable apple tree.

export function initFlyingRainbowDash() {
  var container = document.getElementById("flying-rainbow-dash");

  if (!container) return;

  var leftToRightImages = [
    "../../media/image/flying/rainbowdashflying1.png",
    "../../media/image/flying/rainbowdashflying2.png",
  ];

  var rightToLeftImages = [
    "../../media/image/flying/rainbowdashflying3.png",
    "../../media/image/flying/rainbowdashflying4.png",
  ];

  var direction = "left-to-right";

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function randomSkyPosition() {
    // Keep Rainbow Dash in the upper portion of the page.
    // Change these values if you want a larger/smaller sky area.
    return 5 + Math.random() * 35;
  }

  function fly() {
    var dash = document.createElement("img");

    dash.className = "flying-dash";

    var image;

    if (direction === "left-to-right") {
      image = randomItem(leftToRightImages);
    } else {
      image = randomItem(rightToLeftImages);
    }

    dash.src = image;
    dash.alt = "";

    // Random vertical position in the sky
    dash.style.top = randomSkyPosition() + "vh";

    container.appendChild(dash);

    // Wait for the image dimensions before starting
    dash.onload = function () {
      var dashWidth = dash.offsetWidth;
      var screenWidth = window.innerWidth;

      var duration = 1 + Math.random() * 3;

      if (direction === "left-to-right") {
        // Start outside the left side
        dash.style.left = -dashWidth + "px";

        // Force the browser to apply the starting position
        dash.offsetWidth;

        // Fly to the right side
        dash.style.transition = "left " + duration + "s linear";

        dash.style.left = screenWidth + "px";

        setTimeout(function () {
          dash.remove();

          // Change direction
          direction = "right-to-left";

          fly();
        }, duration * 1000);
      } else {
        // Start outside the right side
        dash.style.left = screenWidth + "px";

        // Force the browser to apply the starting position
        dash.offsetWidth;

        // Fly to the left side
        dash.style.transition = "left " + duration + "s linear";

        dash.style.left = -dashWidth + "px";

        setTimeout(function () {
          dash.remove();

          // Change direction
          direction = "left-to-right";

          fly();
        }, duration * 1000);
      }
    };
  }

  // Start the first flight
  fly();
}

// Tree 1 shakes and drops an apple when clicked
export function initTreeShake() {
  var tree = document.querySelector(".tree-1");
  var wrap = document.querySelector(".grass-wrap");
  if (!tree || !wrap) return;

  function spawnApple() {
    var treeRect = tree.getBoundingClientRect();
    var wrapRect = wrap.getBoundingClientRect();

    var apple = document.createElement("img");
    apple.className = "falling-apple";
    apple.src = "../../media/image/trees/apple.png";
    apple.alt = "";
    apple.style.left =
      treeRect.left - wrapRect.left + treeRect.width * 0.5 - 12 + "px";
    apple.style.top =
      treeRect.top - wrapRect.top + treeRect.height * 0.35 + "px";
    wrap.appendChild(apple);

    requestAnimationFrame(function () {
      apple.classList.add("is-falling");
    });

    apple.addEventListener("animationend", function () {
      apple.remove();
    });
  }

  tree.addEventListener("click", function () {
    tree.classList.add("is-shaking");
    spawnApple();
    setTimeout(function () {
      tree.classList.remove("is-shaking");
    }, 600);
  });
}

// Gift book: automatically flips through the gift pages.

export function initGiftBook() {
  var book = document.getElementById("giftBook");
  if (!book) return;

  var pages = [
    {
      page: "../../media/image/gift/bookbooks.png",
      flip: "../../media/image/gift/bookflipmonetary.png",
    },
    {
      page: "../../media/image/gift/bookmonetary.png",
      flip: "../../media/image/gift/bookfliptoys.png",
    },
    {
      page: "../../media/image/gift/booktoys.png",
      flip: "../../media/image/gift/bookflipbooks.png",
    },
  ];

  var pageIndex = 0;

  var HOLD_DELAY = 2000; // How long each page stays visible
  var FLIP_DELAY = 220; // How long the flip image is displayed

  function showPage() {
    // Display the current page
    book.src = pages[pageIndex].page;

    // Wait before flipping to the next page
    setTimeout(function () {
      // Show the flip image BEFORE the next page
      book.src = pages[pageIndex].flip;

      setTimeout(function () {
        // Advance to the next page, looping continuously
        pageIndex = (pageIndex + 1) % pages.length;
        showPage();
      }, FLIP_DELAY);
    }, HOLD_DELAY);
  }

  // Start automatically
  showPage();
}

const zoomable = document.querySelector(".zoomable");

let scale = 1; // Initial scale

zoomable.addEventListener("wheel", function (event) {
  // Prevent default to stop the page from scrolling
  event.preventDefault();

  // Determine zoom in or out based on wheel delta
  if (event.deltaY > 0) {
    scale -= 0.1; // Zoom out
  } else {
    scale += 0.1; // Zoom in
  }

  // Apply the scaling
  zoomable.style.transform = `scale(${scale})`;
});

// Modal Script
function openModal(imgSrc) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-img").src = imgSrc;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
  let modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


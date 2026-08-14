var coll = document.getElementsByClassName("TooGle_list");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null; // Collapse
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // Expand
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const downloadButtons = document.querySelectorAll('.download');

  downloadButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filePath = button.id;

          const link = document.createElement('a');
          link.href = filePath;
          link.download = ''; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
  });
});

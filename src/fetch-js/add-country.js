function checkFileLimit(input, limit) {
  if (input.files.length > limit) {
    alert(`You can only upload ${limit} files for this input`);
    input.value = "";
  }
}
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  var formData = new FormData(event.target);

  fetch("http://localhost:3000/country-info", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      window.location.href = "explore.html";
    })
    .catch((error) => {
      console.error(error);
    });
});

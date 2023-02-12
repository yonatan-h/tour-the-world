function showSearchedValue() {
  var input = document.getElementById("search").value;
  if (input.toLowerCase() === "ethiopia") {
    document.getElementById("Ethiopia").style.display = "block";
    document.getElementById("Bali").style.display = "none";
    document.getElementById("Brazil").style.display = "none";
  } else if (input.toLowerCase() === "bali") {
    document.getElementById("Ethiopia").style.display = "none";
    document.getElementById("Bali").style.display = "block";
    document.getElementById("Brazil").style.display = "none";
  } else if (input.toLowerCase() === "brazil") {
    document.getElementById("Ethiopia").style.display = "none";
    document.getElementById("Bali").style.display = "none";
    document.getElementById("Brazil").style.display = "block";
  } else {
    document.getElementById("Ethiopia").style.display = "none";
    document.getElementById("Bali").style.display = "none";
    document.getElementById("Brazil").style.display = "none";
    return false;
  }
  return true;
}

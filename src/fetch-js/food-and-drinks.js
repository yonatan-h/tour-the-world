const foodSearchBtn = document.querySelector(".food-search-btn-js");
const foodSearchInput = document.querySelector(".food-search-input-js");
const foodsSection = document.querySelector(".foods-js");

foodSearchBtn.addEventListener("click", async () => {
  //if the front end already got the results, do nothing
  const nonDbAnswer = showSearchedValue();
  if (nonDbAnswer) {
    foodsSection.innerHTML = ""; //remove whats inside
    return;
  } else {
    hideNonDb();
  }

  const countryName = foodSearchInput.value;
  const lowerCase = countryName.toLowerCase();
  const foodImages = await getFoodsImages(lowerCase);

  if (foodImages) {
    foodsSection.innerHTML = ""; //remove whats inside

    foodsSection.appendChild(buildFoodsSection(countryName, foodImages));
  } else {
    alert(`There are no search results for ${countryName}`);
  }
});

async function getFoodsImages(countryName) {
  const result = await fetch(
    `http://localhost:3000/country-info/${countryName}`
  ); //FIX THIS

  const country = await result.json();
  if (country.food_images) {
    const foodImages = country.food_images.split(",");
    return foodImages;
  } else {
    return false;
  }
}

function getImageFolderPath() {
  const path = `../backend/uploads/images/additionalImages/`;
  return path;
}

function buildFoodsSection(countryName, foodImages) {
  let foodLis = "";
  for (const imageName of foodImages) {
    const li = `
            <li class="row justify-content-center">
              <div class="col-lg-6 my-2">
                <p>Food_name</p>
                <img
                  src="${getImageFolderPath()}/${imageName}"
                  alt="food"
                  class="img-fluid rounded-5"
                  width="200"
                />
                <p>Category: Foods</p>
              </div>
          </li>`;
    foodLis += li;
  }

  const ulString = `
          <ul>
            <h2>${countryName}</h2>
            <hr />
            ${foodLis}
          </ul>`;

  const domParser = new DOMParser();
  const ul = domParser.parseFromString(ulString, "text/html").body
    .firstElementChild;
  return ul;
}

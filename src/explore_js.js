const buttons = document.querySelectorAll(".card__dropdown-btn");

buttons.forEach(function (button) {
  const div = button.closest("div");
  const elements = div.querySelectorAll("p, section");
  elements.forEach((el) => el.classList.add("card__hidden-content--hidden"));

  button.addEventListener("click", function () {
    elements.forEach((el) =>
      el.classList.toggle("card__hidden-content--hidden")
    );
  });
});
 <script>
      function amLoggedIn() {
        return localStorage.getItem("jwt-token") !== null;
      }

      function getCurrentUserId() {
        const userId = localStorage.getItem("user-id");
        return +userId;
      }

      async function getUserName(userId) {
        const result = await fetch(`http://localhost:3000/users/${userId}`);
        const data = await result.json();
        const userName = data.name;
        return userName;
      }

      async function loadComments() {
        const countryDivs = [...document.querySelectorAll(".country-js")];
        for (const countryDiv of countryDivs) {
          const commentsDiv = countryDiv.querySelector(".comments-js");
          commentsDiv.innerHTML = ""; //reset

          const countryId = countryDiv.getAttribute("id");
          const plainComments = await getCountryComments(countryId);
          const comments = await mapToNormalComments(plainComments);

          for (const comment of comments) {
            const isCurrentUser = comment.userId === getCurrentUserId();

            let commentDiv;
            if (isCurrentUser && amLoggedIn()) {
              commentDiv = createCrudCommentDiv(comment, countryId);
            } else {
              commentDiv = createReadOnlyCommentDiv(comment);
            }
            commentsDiv.appendChild(commentDiv);
          }
          if (amLoggedIn()) {
            const emptyCommentDiv = await createEmptyCommentDiv(countryId);
            commentsDiv.appendChild(emptyCommentDiv);
          } else {
            const loginSuggestP = document.createElement("p");
            loginSuggestP.textContent =
              "login to write, edit, and delte your comments";
            commentsDiv.appendChild(loginSuggestP);
          }
        }
      }

      async function mapToNormalComments(plainComments) {
        const normalComments = [];
        for (const plainComment of plainComments) {
          const content = plainComment.content;
          const userId = plainComment.userid;
          const date = plainComment.date;

          const userName = await getUserName(userId);

          const normalComment = {
            userName,
            content,
            date,
            userId,
          };
          normalComments.push(normalComment);
        }
        return normalComments;
      }

      function createReadOnlyCommentDiv(comment) {
        const { userName, userId, content, date } = comment;
        const friendlyDate = new Date(date).toLocaleTimeString();

        const divString = `
          <div>
              <p>${userName}: ${friendlyDate}</p>
              <p>${comment.content}</p>
          </div>
          `;
        const domParser = new DOMParser();
        const div = domParser.parseFromString(divString, "text/html").body
          .firstElementChild;

        return div;
      }

      async function createEmptyCommentDiv(countryId) {
        const myUserName = await getUserName(getCurrentUserId());
        const divString = `<div>
            <p>Write new comment</p>
              <textarea class="post-text-area" cols="20" rows="3"></textarea>
              <br/>
             <button onclick="postComment(${countryId})">Send</button>
          </div>`;
        const domParser = new DOMParser();
        const div = domParser.parseFromString(divString, "text/html").body
          .firstElementChild;

        return div;
      }

      function toggleVisibility(element1, element2) {
        element1.classList.toggle("d-none");
        element2.classList.toggle("d-none");
      }

      function createCrudCommentDiv(comment, countryId) {
        const { userName, userId, content, date } = comment;
        const textareaId = countryId.toString() + userId.toString() + date;
        const friendlyDate = new Date(date).toLocaleTimeString();

        const divString = `
          <div>
              <p>${userName}: ${friendlyDate}</p>
              
              <div class="show-comment-js">
                <p>${content}</p>
                <button class="edit-comment-btn-js">Edit</button>
              </div>
              <div class="edit-comment-js">
                <textarea id="${textareaId}" cols="20" rows="3">${content}</textarea>
                <div>
                  <button onclick="updateComment('${countryId}', '${userId}', '${date}')" >Save Edited</button>
                  <button onclick="deleteComment('${countryId}', '${userId}', '${date}')">Delete</button>
                  <button class="cancel-edit-comment-btn-js">Cancel</button>
                </div>
              </div>
                  
          </div>
          `;
        const domParser = new DOMParser();
        const div = domParser.parseFromString(divString, "text/html").body
          .firstElementChild;

        const showCommentDiv = div.querySelector(`.show-comment-js`);
        const editCommentDiv = div.querySelector(`.edit-comment-js`);
        editCommentDiv.classList.add("d-none");

        const editCountryBtn = div.querySelector(".edit-comment-btn-js");
        const cancelEditCountryBtn = div.querySelector(
          ".cancel-edit-comment-btn-js"
        );

        editCountryBtn.addEventListener("click", () =>
          toggleVisibility(showCommentDiv, editCommentDiv)
        );
        cancelEditCountryBtn.addEventListener("click", () =>
          toggleVisibility(showCommentDiv, editCommentDiv)
        );

        return div;
      }

      function alertEmptyComment() {
        alert("Please write non empty comments!");
      }

      async function getCountryComments(countryId) {
        const result = await fetch(
          `http://localhost:3000/comments/${countryId}`
        );
        const data = await result.json();
        return data;
      }

      //crud points
      async function postComment(countryId) {
        const countryDiv = document.getElementById(countryId);
        const textarea = countryDiv.querySelector(".post-text-area");
        const content = textarea.value;
        if (!content) return alertEmptyComment();

        const submittedComment = { content };
        const myUserId = getCurrentUserId();
        const authorizationHeader =
          "Bearer " + localStorage.getItem("jwt-token");

        await fetch(`http://localhost:3000/comments/${countryId}/${myUserId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationHeader,
          },
          body: JSON.stringify(submittedComment),
        });
        loadComments();
      }

      async function updateComment(countryId, myUserId, date) {
        const textareaId = countryId + myUserId + date;
        const content = document.getElementById(textareaId).value;
        if (!content) return alertEmptyComment();

        const submittedComment = { content };
        const authorizationHeader =
          "Bearer " + localStorage.getItem("jwt-token");
        await fetch(
          `http://localhost:3000/comments/${countryId}/${myUserId}/${date}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationHeader,
            },

            body: JSON.stringify(submittedComment),
          }
        );
        loadComments();
      }

      async function deleteComment(countryId, myUserId, date) {
        const authorizationHeader =
          "Bearer " + localStorage.getItem("jwt-token");
        await fetch(
          `http://localhost:3000/comments/${countryId}/${myUserId}/${date}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationHeader,
            },
          }
        );

        loadComments();
      }
    </script>

    <script>
      async function getCountries() {
        const getCountriesUrl = "http://localhost:3000/country-info"; //FIX THIS -------------
        const result = await fetch(getCountriesUrl);
        const data = result.json();
        return data;
      }

      loadCountries();

      async function loadCountries() {
        const countriesContainer = document.querySelector(".countries-js");
        countriesContainer.innerHTML = ""; //reset
        const countries = await getCountries();

        for (const country of countries) {
          const countryId = country.id; //FIX THIS -------------
          const title = country.country; //FIX THIS -------------
          const description = country.text; //FIX THIS -------------
          const mainImage = country.profilefilename; //FIX THIS ------
          const images = country.additional_pics; //first three are country

          let countryCard;
          if (amLoggedIn()) {
            countryCard = crudCountryCard(
              countryId,
              title,
              description,
              mainImage,
              images
            );
          } else {
            countryCard = readOnlyCountryCard(
              countryId,
              title,
              description,
              mainImage,
              images
            );
          }
          countriesContainer.appendChild(countryCard);
        }

        await loadComments();
      }

      function getImageFolderPath() {
        const path = `../backend/uploads/images/additionalImages`;
        return path;
      }

      function crudCountryCard(
        countryId,
        title,
        description,
        mainImage,
        images
      ) {
        //FIX IMAGE SOURCE

        let imageElements = "";
        for (const imageName of images) {
          const imageElement = `<img
                class="w-25"
                src="${getImageFolderPath()}/${imageName}"
                alt="a picture of ${title}"
              />`;
          imageElements += imageElement;
        }

        const textAreaId = `${countryId}-country-edit-js`;

        const divString = `
        <div class="accordion-item w-75 py-2 mx-auto country-js" id="${countryId}">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button bg-dark text-white rounded-4 p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${countryId}"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="d-flex justify-content-between w-100">
              <p>${title}</p>
              <img src="${getImageFolderPath()}/${mainImage}" width="60" alt="A temple of bali" />
            </div>
          </button>
        </h2>
        <section
          id="collapse-${countryId}"
          class="accordion-collapse collapse show py-3 w-75 mx-auto"
          aria-labelledby="headingTwo"
          data-bs-parent="#dropdown"
        >
          <div class="accordion-body bg-info rounded-3 text-white text-center">
            <div class="description-container">
              <!-- things go in here -->
            </div>
            <div class="show-country-js">
              <p class="card__hidden-content__text">${description}</p>
              <button class="edit-country-btn-js">Edit</button>
            </div>
            <div class="edit-country-js">
              <textarea class="card__hidden-content__text" id="${textAreaId}">${description}</textarea>
              <div>
                <button onclick="updateCountry('${countryId}', '${textAreaId}')" >Save</button>
                <button onclick="deleteCountry('${countryId}')" >Delete</button>
                <button class="cancel-edit-country-btn-js">Cancel</button>
              </div>
            </div>
            <div class="py-3">
              ${imageElements}
            </div>
            <div class="comments-js">
                <!-- comment -->
            </div>
          </div>
        </section>
      </div>
        `;
        const domParser = new DOMParser();
        const div = domParser.parseFromString(divString, "text/html").body
          .firstElementChild;

        const showCountryDiv = div.querySelector(`.show-country-js`);
        const editCountryDiv = div.querySelector(`.edit-country-js`);
        editCountryDiv.classList.add("d-none");

        const editCountryBtn = div.querySelector(".edit-country-btn-js");
        const cancelEditCountryBtn = div.querySelector(
          ".cancel-edit-country-btn-js"
        );

        editCountryBtn.addEventListener("click", () =>
          toggleVisibility(showCountryDiv, editCountryDiv)
        );
        cancelEditCountryBtn.addEventListener("click", () =>
          toggleVisibility(showCountryDiv, editCountryDiv)
        );

        return div;
      }

      async function deleteCountry(countryId) {
        const jwtToken = localStorage.getItem("jwt-token");
        const authorizationHeader = "Bearer " + jwtToken;

        await fetch(`http://localhost:3000/country-info/${countryId}`, {
          //FIX THIS ----------------
          method: "DELETE",
          headers: {
            Authorization: authorizationHeader,
          },
        });

        await loadCountries();
      }

      function readOnlyCountryCard(
        countryId,
        title,
        description,
        mainImage,
        images
      ) {
        let imageElements = "";
        for (const imageName of images) {
          const imageElement = `<img
                class="w-25"
                src="${getImageFolderPath()}/${imageName}"
                alt="a picture of ${title}"
              />`;
          imageElements += imageElement;
        }

        const divString = `
        <div class="accordion-item w-75 py-2 mx-auto country-js" id="${countryId}">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button bg-dark text-white rounded-4 p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-${countryId}"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="d-flex justify-content-between w-100">
              <p>${title}</p>
              <img src="${getImageFolderPath()}/${mainImage}" width="60" alt="A temple of bali" />
            </div>
          </button>
        </h2>
        <section
          id="collapse-${countryId}"
          class="accordion-collapse collapse show py-3 w-75 mx-auto"
          aria-labelledby="headingTwo"
          data-bs-parent="#dropdown"
        >
          <div class="accordion-body bg-info rounded-3 text-white text-center">
            <p class="card__hidden-content__text">${description}</p>
            <div class="py-3">
              ${imageElements}
            </div>
            <div class="comments-js">
                <!-- comment -->
            </div>
          </div>
        </section>
      </div>
        `;

        const domParser = new DOMParser();
        const div = domParser.parseFromString(divString, "text/html").body
          .firstElementChild;

        return div;
      }

      function alertEmptyCountry() {
        alert("Please write non empty country cards!");
      }

      //crud points
      async function updateCountry(countryId, textAreaId) {
        const description = document.getElementById(textAreaId).value;
        if (!description) return alertEmptyCountry();

        const body = JSON.stringify({ text: description });
        const jwtToken = localStorage.getItem("jwt-token");
        const authorizationHeader = "Bearer " + jwtToken;

        const result = await fetch(
          `http://localhost:3000/country-info/${countryId}`, //FIX THIS
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationHeader,
            },

            body: body,
          }
        );
        await loadCountries();
      }
    </script>

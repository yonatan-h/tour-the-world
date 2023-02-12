const form = document.getElementById("authenticateUserForm");
form.onsubmit = authenticateUser;

async function authenticateUser(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const toBeJson = {};

  for (const keyValuePair of formData) {
    toBeJson[keyValuePair[0]] = keyValuePair[1];
  }
  const json = JSON.stringify(toBeJson);

  const result = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  });

  const data = await result.json();
  const jwtToken = data["access_token"];
  console.log(jwtToken);

  localStorage.setItem("jwt-token", jwtToken);
  accessProtectedRoute();
}

async function accessProtectedRoute() {
  const jwtToken = localStorage.getItem("jwt-token");
  const authorizationHeader = "Bearer " + jwtToken;
  const result = await fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationHeader,
    },
  });

  const data = await result.json();
  console.log(data);

  if (data["message"] != "Unauthorized") {
    const emailValue = document.getElementById("email").value;
    const jsonEmail = { email: emailValue };
    const transformedForm = JSON.stringify(jsonEmail);

    const emailVal = await fetch("http://localhost:3000/auth/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: transformedForm,
    });

    const something = await emailVal.json();
    localStorage.setItem("user-id", something.id);

    console.log(localStorage.getItem("user-id"));
    window.location = "home.html";
  } else {
    alert("Wrong email or password");
  }
}

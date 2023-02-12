const form = document.getElementById("createUserForm");
form.onsubmit = registerUser;

async function registerUser(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const toBeJson = {};
  for (const keyValuePair of formData) {
    const key = keyValuePair[0];
    const value = keyValuePair[1];
    toBeJson[key] = value;
  }
  const json = JSON.stringify(toBeJson);

  console.log(json);

  const result = await fetch("http://localhost:3000/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  });

  const data = await result.json();
  console.log(data);
  window.location = "login.html";
}

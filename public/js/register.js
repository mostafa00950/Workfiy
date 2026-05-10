const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("fullName").value,

    email: document.getElementById("email").value,

    password: document.getElementById("password").value,

    gender: document.getElementById("gender").value,

    specialist: document.getElementById("specialist").value,
  };

  const response = await fetch("/register", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  const data = await response.json();

  const msg = document.getElementById("registerMsg");

  msg.innerText = data.msg;

  if (data.msg === "Register Success") {
    msg.style.color = "lime";

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } else {
    msg.style.color = "red";
  }
});

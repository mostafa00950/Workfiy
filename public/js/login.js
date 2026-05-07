const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("email").value,

    password: document.getElementById("password").value,
  };

  const response = await fetch("/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  const msg = document.getElementById("loginMsg");

  msg.innerText = data.msg;

  if (data.msg === "Login Success") {
    msg.style.color = "lime";

    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else {
    msg.style.color = "red";
  }
});

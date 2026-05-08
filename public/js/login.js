const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("email").value,

    password: document.getElementById("password").value,
  };

  try {
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

    // Wrong بيانات

    if (data.msg === "Wrong Password" || data.msg === "Email Not Found") {
      msg.style.color = "red";

      return;
    }

    // Login Success

    msg.style.color = "lime";

    localStorage.setItem("isLoggedIn", "true");

    // Admin Login

    if (data.isAdmin) {
      sessionStorage.setItem("isAdmin", "true");

      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    }

    // Normal User
    else {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  } catch (error) {
    console.log(error);

    alert("Server Error");
  }
});

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    const msg = document.getElementById("loginMsg");
    msg.innerText = data.msg;

    if (data.msg === "Login Success" || data.msg === "Admin Login Success") {
      msg.style.color = "lime";
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", data.isAdmin);
      
      if (data.msg === "Login Success" || data.msg === "Admin Login Success") {
        msg.style.color = "lime";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("userName", data.data.name); // ← هنا
            
        setTimeout(() => {
          if (data.isAdmin) {
            window.location.href = "http://localhost:3000/admin.html";
          } else {
            window.location.href = "index.html";
          }
        }, 1000);
      }
      if (data.data) {
        localStorage.setItem("userName", data.data.name);
      } else {
        localStorage.setItem("userName", "Admin");
      }

      setTimeout(() => {
        if (data.isAdmin) {
          window.location.href = "http://localhost:3000/admin.html";
        } else {
          window.location.href = "index.html";
        }
      }, 1000);

    } else {
      msg.style.color = "red";
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
});
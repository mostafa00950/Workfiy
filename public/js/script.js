const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

if (searchInput && searchButton) {
  // Search on button click
  searchButton.addEventListener("click", performSearch);

  // Search on Enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      // For now, we'll just show an alert with the search term
      // In a real application, this would filter jobs or navigate to search results
      alert(
        `Searching for: "${searchTerm}"\n\nIn a real application, this would show matching jobs and internships.`,
      );

      // Clear the search input
      searchInput.value = "";

      // Navigate to jobs page
      window.location.href = "/jobs";
    } else {
      alert("Please enter a search term to find jobs and internships.");
    }
  }
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    alert(
      `Thank you, ${name}! Your message has been received. We'll get back to you soon.`,
    );

    // Reset the form
    contactForm.reset();
  });
}

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

//!  Logout Buttonconst loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
function updateAuthUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}
// logout
function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  updateAuthUI();
  window.location.href = "/";
}

logoutBtn.addEventListener("click", handleLogout);
updateAuthUI();

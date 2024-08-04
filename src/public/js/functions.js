export function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Function to dynamically load scripts based on the current page path
export function loadScripts(level) {
  const pagePath = window.location.pathname;

  // Create a new script element
  let script = document.createElement("script");
  script.type = "module";

  // Determine the base path to check against
  let index;
  if (level === "admin") {
    index = pagePath.indexOf("/admin");
  } else {
    index = pagePath.indexOf("/");
  }

  // Extract the relevant part of the page path
  let page = index !== -1 ? pagePath.substring(index) : "";

  // Normalize paths for specific pages with dynamic segments
  // Example:
  // if (page.includes("/admin/some-specific-path")) {
  //   page = "/admin/some-specific-path";
  // }

  // Determine the appropriate script to load based on the normalized page path
  switch (page) {
    // Example cases for client-side routes
    case "":
    case "/":
      script.src = "/js/client/home.js";
      break;
    case "/client-example":
      script.src = "/js/client/example.js";
      break;

    // Example cases for admin-side routes
    case "/admin":
      script.src = "/js/admin/home.js";
      break;
    case "/admin-example":
      script.src = "/js/admin/example.js";
      break;

    default:
      // Handle cases where the page path doesn't match any of the expected paths
      console.error("Unknown page:", page);
      return;
  }

  // Append the script to the document body
  document.body.appendChild(script);
}

// Function to display toast notifications using SweetAlert2
export function toast(options = {}) {
  const {
    status = "success", // Default status of the toast (success, error, warning, info)
    message = "Operation completed successfully.", // Default message of the toast
    position = "bottom-end", // Default position of the toast on the screen
    timer = 3000, // Default time duration the toast is displayed (in milliseconds)
  } = options;

  // Initialize the SweetAlert2 toast mixin with custom options
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      // Pause the timer when the mouse enters the toast
      toast.addEventListener("mouseenter", Swal.stopTimer);
      // Resume the timer when the mouse leaves the toast
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // Fire the toast notification with the specified icon and message
  Toast.fire({
    icon: status,
    title: message,
  });
}

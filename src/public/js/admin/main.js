import { loadScripts } from "../functions.js";
loadScripts("admin");

if (localStorage.getItem("theme") === "dark") {
  $("#theme-span").text("oscuro");
} else {
  $("#theme-span").text("claro");
}

$("#toggle-dark-mode").on("click", () => {
  const htmlElement = document.documentElement;
  const currentMode = htmlElement.getAttribute("data-mode");
  const newMode = currentMode === "light" ? "dark" : "light";
  htmlElement.setAttribute("data-mode", newMode);
  localStorage.setItem("theme", newMode); // Toggle icons

  if (newMode === "dark") {
    $("#theme-span").text("oscuro");
  } else {
    $("#theme-span").text("claro");
  }

  $("#toggle-icon-moon").toggleClass("hidden");
  $("#toggle-icon-sun").toggleClass("hidden");
});
$(document).ready(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-mode", savedTheme);
  if (savedTheme === "dark") {
    $("#toggle-icon-moon").addClass("hidden");
    $("#toggle-icon-sun").removeClass("hidden");
  } else {
    $("#toggle-icon-moon").removeClass("hidden");
    $("#toggle-icon-sun").addClass("hidden");
  }
});

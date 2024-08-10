import { setYearInFooter } from "./footer.js";
import { fetchHtmlFile } from "./fetch-files.js";

window.addEventListener("DOMContentLoaded", async () => {
    // Load the site nav and footer
    document.querySelector("#site-nav").innerHTML = (await fetchHtmlFile("/templates/nav.html"));
    document.querySelector("#site-footer").innerHTML = (await fetchHtmlFile("/templates/footer.html"));

    // Set the current year in the footer
    setYearInFooter();
});

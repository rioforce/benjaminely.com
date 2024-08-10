import { fetchTextFile, fetchJsonFile } from "./fetch-files.js";
import { formatPostDate } from "./post-tools.js";

const postArea = document.querySelector("main");
const postTitle = postArea.querySelector(".post-title");
const postDate = postArea.querySelector(".post-date");
const postAuthor = postArea.querySelector(".post-author");
const postContent = postArea.querySelector(".post-content");

function updatePageTitle(title) {
    let pipeIndex = document.title.indexOf("|") + 1;

    // We want to remove the extra text added earlier
    if (!title) {
      document.title = document.title.substr(pipeIndex);
      return;
    }

    // We have a blank title, simply append it
    if (document.title.indexOf("|") === -1) {
      document.title = `${title} | ${document.title}`;
      return;
    }

    // A title has already been added, replace it with the new one
    document.title = `${title} | ${document.title.substr(pipeIndex)}`;
  }


async function loadPost() {
    // Fetch the post metadata and Markdown content
    let postMeta = await fetchJsonFile("info.json");
    let markdown = marked.parse(await fetchTextFile("post.md"));

    // Update the page title with the post title
    updatePageTitle(postMeta.title);

    // Add the post metadata and content
    postTitle.textContent = postMeta.title;
    postAuthor.textContent = postMeta.author;
    postDate.textContent = formatPostDate(postMeta.date);
    postContent.innerHTML = markdown;
}

document.addEventListener("DOMContentLoaded", async () => { loadPost(); });

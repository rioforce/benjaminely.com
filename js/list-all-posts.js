import { fetchTextFile, fetchJsonFile } from "./fetch-files.js";
import { formatPostDate } from "./post-tools.js";

// Function to generate the dynamic post list
async function generatePostsList() {
    const postsListContainer = document.querySelector('.posts-list');

    // Fetch posts data from external file
    const allPosts = await fetchJsonFile('../posts/post-list.json');

    // Stop if we, for some reason, can't find any recommended posts
    if (allPosts.length === 0) {
        return;
    }

    // Get the HTML template to use
    const template = await fetchTextFile("../templates/post-item.html");

    // Map each post slug into a fetched request so we load them in order
    let postMetaUrls = allPosts.map(function(slug) {
        return fetchJsonFile(`../posts/${slug}/info.json`);
    });

    // Remove the "no posts" message since we know we have posts
    postsListContainer.textContent = "";

    // Loop through the post list, in order, and create elements for each
    let renderElements = ["title", "author"];
    Promise.all(postMetaUrls).then(posts => {
        posts.forEach((postMeta, index) => {
            // Make a copy of the template HTML for rendering
            let thisPost = template.slice();

            // Add the post info into the HTML
            renderElements.forEach((key) => {
                thisPost = thisPost.replace(new RegExp(`:post-${key}:`, "g"), postMeta[key]);
            });

            // Add the post URL, date, and link to the post
            thisPost = thisPost.replace(/:post-url:/g, `/posts/${allPosts[index]}/`);
            thisPost = thisPost.replace(/:post-date:/g, formatPostDate(postMeta.date));
            postsListContainer.insertAdjacentHTML("beforeend", thisPost);
        });
    });
};

// Call the function to generate the post list on page load
document.addEventListener("DOMContentLoaded", generatePostsList);

import { fetchHtmlFile, fetchJsonFile } from "./fetch-files.js";ç

// Function to generate the dynamic post list
async function generatePostsList() {
    const postsListContainer = document.querySelector('.posts-list');
    const postDateFormat = {year: 'numeric', month: 'long', day: 'numeric'};

    // Fetch posts data from external file
    const allPosts = await fetchJsonFile('../posts/post-list.json');

    // Stop if we, for some reason, can't find any recommended posts
    if (allPosts.length === 0) {
        return;
    }

    // Get the HTML template to use
    const template = await fetchHtmlFile("../templates/post-item.html");

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

            // The time portion does not matter but is required here to make the dates parse correctly
            let postDate = new Date(`${postMeta.date}T00:00:00`);
            thisPost = thisPost.replace(/:post-date:/g, postDate.toLocaleString('en-US', postDateFormat));

            // Add the URL to the post
            thisPost = thisPost.replace(/:post-url:/g, `/posts/${allPosts[index]}/index.html`);

            // Add the link to the post into the page
            postsListContainer.insertAdjacentHTML("beforeend", thisPost);
        });
    });
};

// Call the function to generate the post list on page load
document.addEventListener("DOMContentLoaded", generatePostsList);

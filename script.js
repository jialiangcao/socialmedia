async function populatePost(number, loop) {
  const requestURL = "https://jsonplaceholder.typicode.com/posts/" + number;
  console.log(requestURL);
  const request = new Request(requestURL);
  const response = await fetch(request);
  const post = await response.json();
  console.log(post);

  const feedpost = document.createElement("p" + loop);
  //I chose to add a new element to the page every time so it's more scalable and not hard coded
  const feed = document.getElementById("Feed");
  feed.appendChild(feedpost);
  //Adds it to the actual page
  feedpost.textContent = post.body;
}

async function populatePhoto(number) {
  const requestURL = "https://jsonplaceholder.typicode.com/photos/" + number;
  console.log(requestURL);
  const request = new Request(requestURL);
  const response = await fetch(request);
  const photo = await response.json();
  console.log(photo);

  const feedImage = document.createElement("img");
  const feed = document.getElementById("Feed");
  feed.appendChild(feedImage);
  feedImage.src = photo.url;
  // Same concept as above instead of textcontent using .url
}

async function populateFeed(loop) {
  let random = Math.floor(Math.random() * 101);
  // Random gets a new post every time

  // Populates my post, making sure to wait for it to finish
  await populatePost(random, loop);

  // Wait for the Post to finish showing before showing the photo, because APIs work at different speeds
  await populatePhoto(random);
}

async function run() {
  for (let i = 0; i < 10; i++) {
    await populateFeed(i);
  }
}

// Calls all of my functions to run
run();

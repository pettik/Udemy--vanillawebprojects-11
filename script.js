const postContainer = document.querySelector('#posts-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;


//  Fetch posts from API
async function getPosts(){
   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

   const data = await res.json();
   console.log(data);
}


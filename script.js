const usersContainer = document.querySelector('#users-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');
const finalMessage = document.querySelector('.final-message');

let limit = 8;
let page = 1;


//  Fetch posts from API
async function getUsers() {
   const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}&_page=${page}`);
   const data = await res.json();
   return data;
}
// Fetch avatar images
async function getAvatar() {
   const res = await fetch(`https://randomuser.me/api`);
   const data = await res.json();
   return data.results[0].picture.thumbnail;
}

// Show posts in DOM
async function showUsers() {
   const users = await getUsers();

   for (let user of users) {
      const avatar = await getAvatar();

      const userEl = document.createElement('div');
      userEl.classList.add('user');
      userEl.innerHTML = `
       <div class="number">${user.id}</div>
       
       <div class="user-info">
       <div class="avatar_name">
       <img
       src="${avatar}"
       alt="avatar"
     />
         <h2 class="name">${user.name}</h2>
       </div> 
         <p class="username"><span>Nick:</span>${user.username}</p>
         <p class="email"><span>E-mail:</span>${user.email}</p>
         <p class="city"><span>City:</span>${user.address.city}</p>
       </div>
     `;
      usersContainer.appendChild(userEl);
   }
}

// Show loader & fetch more posts
function showLoading() {
   loading.classList.add('show');

   setTimeout(() => {
      loading.classList.remove('show');

      setTimeout(() => {
         page++;
         showUsers();
      }, 300);

   }, 1000);
}


// Filter users by input
function filterUser(e) {
   ;
   const term = e.target.value.toUpperCase();
   const users = document.querySelectorAll('.user');

   users.forEach(user => {
      const userName = user.querySelector('.name').innerHTML.toUpperCase();

      if (userName.indexOf(term) > -1) {
         user.style.display = 'flex';
      } else {
         user.style.display = 'none';
      }
   });
}


// Show initial posts
showUsers();


// EventListeners
window.addEventListener('scroll', () => {
   const {
      scrollTop,
      scrollHeight,
      clientHeight
   } = document.documentElement;
   const users = document.querySelectorAll('.user');


   if (scrollHeight - scrollTop === clientHeight) {
      if (users.length < 10) {
         showLoading();
      } else {
         finalMessage.classList.add('show');
      }

   }
});

filter.addEventListener('input', filterUser);

"use strict";

/**
 Show page function - shows the selected page of students
 @param list - List of students to be paginated
 @param page - Page number to be shown
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9
   const endIndex = page * 9
   const studentList = document.querySelector(".student-list")

   // removes any previously displayed students
   studentList.innerHTML = ""

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;

         studentList.insertAdjacentHTML("beforeend", studentItem);
      }
   }
}

/**
 Append page links function - Create and append pagination links for list
 @param list - List of students to be paginated
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9)
   const linkList = document.querySelector(".link-list")

   // removes any previously displayed pagination
   linkList.innerHTML = ""
   
   for (let i = 1; i <= numOfPages; i++) {
      const button = `<li><button type="button">${i}</button</li>`

      linkList.insertAdjacentHTML("beforeend", button);
   }

   document.querySelector("li > button").className = "active";

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         document.querySelector(".active").className = "";
         e.target.className = "active"

         showPage(list, e.target.textContent)
      }
   });
}

function addSearchBar() {
   const header = document.querySelector(".header");

   const searchBar = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `

   header.insertAdjacentHTML("beforeend", searchBar)
}

showPage(data, 1);
addPagination(data);
addSearchBar();

document.getElementsByTagName("button")[0].addEventListener("click", () => {
   const searchValue = document.querySelector("#search").value
   const searchData = []
   
   for (let i = 0; i < data.length; i++) {
      const name = data[i].name;
      
      if (name.first.toLowerCase().includes(searchValue) || name.last.toLowerCase().includes(searchValue)) {
         searchData.push(data[i]);
      }
   }

   if (searchData.length === 0) {
      const studentList = document.querySelector(".student-list");
      const message = `<p>Sorry, there are no matches for that search.</p>`

      // removes student list and pagination
      studentList.innerHTML = ""
      document.querySelector(".link-list").innerHTML = ""

      studentList.insertAdjacentHTML("beforeend", message)
   } else {
      showPage(searchData, 1);
      addPagination(searchData);
   }
});

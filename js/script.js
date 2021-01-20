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

   document.querySelector("button").className = "active";

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         document.querySelector(".active").className = "";
         e.target.className = "active"

         showPage(list, e.target.textContent)
      }
   });
}

showPage(data, 1);
addPagination(data);
appendSearch();

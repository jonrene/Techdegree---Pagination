/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



// This function displays a page of students
function showPage(list, page){
   const itemsPerPage = 9;

   // Determines start and ending indexes for list of students to display using page parameter
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = startIndex + (itemsPerPage - 1);
   if (endIndex > list.length - 1){
      endIndex = list.length - 1;
   }

   // This creates a reference/element to the student list and makes the list empty
   let studentList = document.getElementsByClassName("student-list")[0];

   // Initializes student list element to empty string
   studentList.innerHTML = "";

   // Creates list item elements(profiles) and shows them
   for(let i = startIndex; i<= endIndex; i++){

      // List Item to be added to student list 
      let listElement = document.createElement('LI');
      listElement.className = "student-item cf";

      // creates picture element for profiles
      let picture = document.createElement('IMG');
      picture.className = 'avatar';
      picture.src = data[i]['picture']['large'];

      // creates header for profiles
      let header = document.createElement("H3");
      header.innerHTML = `${data[i]['name']['first']} ${data[i]['name']['last']}`;

      // creates a span element for email for profiles
      let email = document.createElement("SPAN");
      email.innerHTML = data[i]['email'];
      email.className = 'email';

      //creates a span element for date joined
      let dateJoined = document.createElement("SPAN");
      dateJoined.innerHTML = `Joined ${data[i]['registered']['date']}`;
      dateJoined.className = 'date';

      // Div for student details
      let studentDetails = document.createElement('DIV');
      studentDetails.className = "student-details";
      studentDetails.appendChild(picture);
      studentDetails.appendChild(header);
      studentDetails.appendChild(email);

      // Div for joined details
      let joinedDetails = document.createElement('DIV');
      joinedDetails.className = "joined-details";
      joinedDetails.appendChild(dateJoined);
      listElement.appendChild(studentDetails);
      listElement.appendChild(joinedDetails);

      // Appends created proifle to student list
      studentList.appendChild(listElement);
   }

}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(){
   const itemsPerPage = 9;

   // Determines number of buttons needed
   const numberOfButtons = Math.ceil(data.length / itemsPerPage);
   
   // Creates reference/element to button navigation list
   const buttonList = document.getElementsByClassName("link-list")[0];

   // creates buttons
   // Initialzes first button's class to 'active'
   for (let i = 1; i<= numberOfButtons; i++){
      let currButton = document.createElement('BUTTON');
      currButton.type = "button";
      currButton.value = i;
      currButton.innerHTML = i;
      if (i === 1){
         currButton.className = "active";
      } else {
         currButton.className = "inactive";
      }
      let listButton = document.createElement('LI');
      listButton.appendChild(currButton);
      buttonList.appendChild(listButton);
   }


   // adds event listener to first button
   buttonList.firstElementChild.addEventListener('click', (e) => {
      //finds all active buttons
      const activeButton = buttonList.getElementsByClassName('active')[0];
      activeButton.className = "inactive";
      e.target.className = 'active';
      showPage(data, e.target.value);
   })

   // adds event listener to rest of buttons
   const buttons = buttonList.getElementsByClassName('inactive');
   for (let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', (e) => {
         //finds all active buttons
         const activeButton = buttonList.getElementsByClassName('active')[0];
         activeButton.className = "inactive";
         e.target.className = 'active';
         showPage(data, e.target.value);
      })
   }

}

// Call functions
showPage(data, 1);
addPagination();

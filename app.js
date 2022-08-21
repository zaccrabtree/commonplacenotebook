//These are the variables I created for DOM manipulation in JS.

let form = document.getElementById("form");

let textInput1 = document.getElementById("textInput1");

let textInput2 = document.getElementById("textInput2");

let dateInput = document.getElementById("dateInput");

let textarea = document.getElementById("textarea");

let msg1 = document.getElementById("msg1");

let msg2 = document.getElementById("msg2");

let quotes = document.getElementById("quotes");

let add = document.getElementById("add");

let modalFooter = document.getElementById("modal-footer");

let modalBody = document.getElementById("modal-body")

let msg3Holder = document.createElement("span")

//Below are the various events that I keyed to the form submission-- which functions to call
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation1();
  });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation2();
  });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    textareaValidation();
} )

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(textInput1.value != "" && textInput2.value !="" && textarea.value !=""){
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {add.setAttribute("data-bs-dismiss", "");
    })();
    }
})
//Here are the functions I created for the purpose of submission of a valid form
  let formValidation1 = () => {
    if (textInput1.value === "") {
      console.log("failure");
      msg1.innerHTML = "Book Title cannot be blank";
    } else {
      console.log("success");
      msg1.innerHTML = "";
    }
  };

  let formValidation2 = () => {
    if (textInput2.value === "") {
      console.log("failure");
      msg2.innerHTML = "Author cannot be blank";
    } else {
      console.log("success");
      msg2.innerHTML = "";
    }
  };

  let textareaValidation = () => {
    if (textarea.value === "") {
        console.log("failure");
        msg3Holder.innerHTML = "Quotation cannot be blank";
        modalBody.appendChild(msg3Holder);
    }
        else {
            console.log("success");
            textarea.innerHTML = "";
        }
    };
//Here is my data storage array.
  let data = [];

//This function takes the form data and pushes it into data array.
  let acceptData = () => {
    data.push({
      title: textInput1.value,
      author: textInput2.value,
      date: dateInput.value,
      quotation: textarea.value,
    });
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
    createQuotes();
  };

  //This function first creates a div, styled with bootstrap, and inputs the information 
  //from the data object array, then appends them into the html, then resets the form.
  let createQuotes = () => {
    quotes.innerHTML = "";
    data.map((x, y) => {
      return (quotes.innerHTML += `
      <div class="bg-success p-2 text-white bg-opacity-75 position-relative" id=${y}>
            <span class="fw-bold">${x.title}</span>
            <span class="fw-bold">${x.author}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.quotation}</p>
    
            <span class="options">
              <i onClick= "editQuote(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteQuote(this);createQuotes()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
    resetForm();
  };
//My reset form makes all the values blank once a new object is submitted to the data array.
  let resetForm = () => {
    textInput1.value = "";
    textInput2.value = "";
    dateInput.value = "";
    textarea.value = "";
    msg3Holder.remove();
  };
//This is the function that provides the "delete" part of the CRUD functionality. It uses the 
//"splice" array method to remove only the object it starts with.
  let deleteQuote = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };

  //This is the function used for the "update" part of CRUD functionality. 
  let editQuote = (e) => {
    let selectedQuote = e.parentElement.parentElement;
  
    textInput1.value = selectedQuote.children[0].innerHTML;
    textInput2.value = selectedQuote.children[1].innerHTML;
    dateInput.value = selectedQuote.children[2].innerHTML;
    textarea.value = selectedQuote.children[3].innerHTML;
  
    deleteQuote(e);
  };
//This is an IIFE that I used to make sure the data stays stored by 
//the CRUD app, even if it is refreshed.
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createQuotes();
  })();
  
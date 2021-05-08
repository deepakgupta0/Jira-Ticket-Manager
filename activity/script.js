'use strict';
// a=10;

let filterColourOptions = document.querySelectorAll(".filter-colors");
let mainContainer = document.querySelector(".main-container");
let modelContainer = document.querySelector(".modal-container");
let addBtn = document.querySelector(".add");
let removeBtn = document.querySelector(".remove");
let textArea = document.querySelector(".desc-box");
let modalColors = document.querySelectorAll(".modal-filters");
let blackColor = document.querySelector(".modal-filters.black");
// console.log(blackColor);
let flag = false;
let removeFlag = false;
let coloursAvailabe = ["lightpink", "lightblue", "lightgreen", "black"];
let defaultColour = coloursAvailabe[3];
let defaultElementIndex = 3;

//WILL USE FOR STORING ALL TASK AND THEN JSONIFYING AND STORING IN LOCALSTORAGE 
let allTaskArray = []


//ON RELOAD BRINGING BACK ORIGINAL TASKS STORED IN LOCAL STORAGE

if (localStorage.getItem("allTask")) {
    let parsedAllTasks = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < parsedAllTasks.length; i++) {
        let eachTask = parsedAllTasks[i];
        let taskId = eachTask.taskid;
        let taskStatement = eachTask.taskStatement;
        let taskColor = eachTask.taskColor;
        createTicket(taskStatement, taskColor, taskId);
    }
}





// ON CLICK CHANGING BACKGROUND_COLOR

// for (let i = 0; i < filterColourOptions.length; i++) {
//     filterColourOptions[i].addEventListener("click", function () {
//         let childrenNodes = filterColourOptions[i].children;
//         let coloredElement = childrenNodes[0];
//         let color = coloredElement.classList[0];
//         if (color == "blue")
//             color = "lightblue"
//         else if (color == "green")
//             color = "lightgreen"
//         else if (color == "black2")
//             color = "grey"
//         else if (color == "pink")
//             color = "lightpink"
//         mainContainer.style.backgroundColor = color;
//     });
// }

// ON CLICK MODAL OPEN

addBtn.addEventListener("click", function (e) {
    textArea.click();
    modalColors.forEach(function (color) {
        color.classList.remove("border");
    })
    blackColor.classList.add("border");
    defaultElementIndex = 3;
    if (flag == false) {
        modelContainer.classList.remove("active");
    }
    else {
        modelContainer.classList.add("active");
    }
    flag = !flag;
});



//ON TEXTAREA PRESSING ENTER AND ADDING TASKS

textArea.addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key == "Enter") {
        let taskStatement = textArea.value;
        // console.log(taskStatement, defaultColour);
        createTicket(taskStatement, defaultColour);
        // defaultColour = coloursAvailabe[3];
        // defaultElementIndex = 3;
        textArea.value = "";
        modelContainer.classList.add("active");
        flag = false;
    }
});


//CATCHING COLOR IN DEFAULT COLOR VARIABLE ALONG WITH BORDER

for (let i = 0; i < modalColors.length; i++) {
    modalColors[i].addEventListener("click", function () {

        textArea.focus();
        defaultColour = modalColors[i].classList[1];
        console.log(defaultColour);
        modalColors[defaultElementIndex].classList.remove("border");
        defaultElementIndex = i;
        modalColors[i].classList.add("border");

    })
}

//REMOVE TICEKT FEATURE

removeBtn.addEventListener("click", function () {
    if (removeFlag == false) {
        removeBtn.classList.add("pressed");
    }
    else {
        removeBtn.classList.remove("pressed");
    }
    removeFlag = !removeFlag;
});




// UTILITY FUNCTIONS


function createTicket(taskStatement, defaultColour, taskId) {
    // <div class="ticket-container">
    //     <div class="ticket-color"></div>
    //     <div class="ticket-inner">
    //         <h3 class="ticket-id">#sampleID</h3>
    //         <p class="text-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, harum.</p>
    //     </div>
    // </div>
    let ticketId;
    if (taskId == undefined) {
        ticketId = shortid();
    }
    else {
        ticketId = taskId;
    }

    allTaskArray.push({
        taskid: ticketId,
        taskStatement: taskStatement,
        taskColor: defaultColour
    })
    localStorage.setItem("allTask", JSON.stringify(allTaskArray));
    let ticketContainer = document.createElement('div');
    ticketContainer.setAttribute('class', 'ticket-container');
    ticketContainer.innerHTML = `
    <div class="ticket-color ${defaultColour}"></div>
             <div class="ticket-inner">
                 <h3 class="ticket-id">#${ticketId}</h3>
                <p class="text-description">${taskStatement}</p>
                </div>`

    mainContainer.appendChild(ticketContainer);

    //ADD CLICK LISTENER  FOR DELETE FEATURE TO TICKET
    handleTicketDelete(ticketContainer);


    // let ticketColor = document.querySelectorAll(".ticket-color");

    let colorStripDiv = ticketContainer.querySelector('.ticket-color');
    handleTicketListener(colorStripDiv, ticketContainer);


    // METHOD 2

    // console.log(ticketColor.classList);

    // for (let i = 0; i < ticketColor.length; i++) {
    //     ticketColor[i].addEventListener("click", function () {
    //         let appliedColor = ticketColor[i].classList[1];
    //         let appliedColorIndex = coloursAvailabe.indexOf(appliedColor);
    //         // console.log(appliedColorIndex);
    //         let newColor = coloursAvailabe[(appliedColorIndex + 1) % coloursAvailabe.length];
    //         ticketColor[i].classList.remove(appliedColor);
    //         ticketColor[i].classList.add(newColor);
    //     });
    // }


}

// FOR CHANGING STRIPE COLOR
function handleTicketListener(colorStripDiv, ticketContainer) {
    colorStripDiv.addEventListener("click", function () {
        let appliedColor = colorStripDiv.classList[1];
        let appliedColorIndex = coloursAvailabe.indexOf(appliedColor);
        // console.log(appliedColorIndex);
        let newColor = coloursAvailabe[(appliedColorIndex + 1) % coloursAvailabe.length];
        colorStripDiv.classList.remove(appliedColor);
        colorStripDiv.classList.add(newColor);
        let parsedAllTasks = JSON.parse(localStorage.getItem("allTask"));

        let ticketId = ticketContainer.querySelector(".ticket-id").innerHTML;
        ticketId = ticketId.split("#")[1];
        // console.log(ticketId);
        let ticketIdList = ticketContainer.querySelector(".ticket-color").classList;
        // console.log(ticketIdList);
        for (let i = 0; i < parsedAllTasks.length; i++) {
            let eachTask = parsedAllTasks[i];
            if (ticketId == eachTask.taskid) {
                // console.log(ticketId);
                eachTask.taskColor = ticketIdList[1];
                localStorage.setItem("allTask", JSON.stringify(parsedAllTasks));
            }
        }
        // console.log(parsedAllTasks);

        // console.log(this);
    });

}


function handleTicketDelete(ticketContainer) {
    ticketContainer.addEventListener("click", function () {
        if (removeFlag == true) {

            let ticketId = ticketContainer.querySelector(".ticket-id").innerHTML;
            // console.log(typeof ticketId);
            ticketId = ticketId.substring(1);
            let parsedAllTasks = JSON.parse(localStorage.getItem("allTask"));

            for (let i = 0; i < parsedAllTasks.length; i++) {
                let eachTask = parsedAllTasks[i];
                if (eachTask.taskid == ticketId) {
                    allTaskArray.splice(i, 1);
                    localStorage.setItem("allTask", JSON.stringify(allTaskArray));
                }
            }

            ticketContainer.remove();
        }
        else {
            console.log("KUCH BHI");
        }
    })
}


// METHOD 2 FOR CHANGING COLOR IN LOCAL STORAGE
function changeColorInStore(colorStripElement, newColor) {
    //  ticket sub container 
    let ticketSubcontainerElem = colorStripElement.parentNode.children[1];
    // unique id element
    let idElem = ticketSubcontainerElem.children[0];
    //  id -> # 
    let id = idElem.innerText.slice(1);
    //  idx
    let idx = taskArr.findIndex(function (ticket) {
        return ticket.id == id;
    })
    // color change 
    taskArr[idx].color = newColor;
    localStorage.setItem("allTasks", JSON.stringify(taskArr));
}
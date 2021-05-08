//event listener
//node
//node properties

let inputBox = document.querySelector(".input-box");
// browser has predefined events

let taskList = document.querySelector(".task-list");
let taskArr = [];

if (localStorage.getItem("tasks")) {
    let taskArr = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskArr.length; i++) {
        let task = taskArr[i];
        let taskElement = document.createElement("li");
        taskElement.setAttribute("class", "task");
        taskElement.innerHTML = task;
        taskList.appendChild(taskElement);
        taskElement.addEventListener("dblclick", function () {
            
            // GET CONTENT AND REMOVE FROM ARRAY
            
            let task = taskElement.innerHTML;
            let idx = taskArr.indexOf(task);
            taskArr.splice(idx, 1);
            
            // WRITE BACK
            
            let stringArr = JSON.stringify(taskArr);
            localStorage.setItem("tasks", stringArr);    
            taskElement.remove();
        
        });

    }
}

inputBox.addEventListener("keypress", function (e) {
    // event object -> that describes event occured
    // console.log("key press was called");
    if (e.code == "Enter" && inputBox.value != "") {
        //page add
        let task = inputBox.value;
        console.log(typeof task);
        taskArr.push(task);
        let stringArr = JSON.stringify(taskArr);
        localStorage.setItem("tasks", stringArr);

        //create node
        let taskElement = document.createElement("li");
        taskElement.setAttribute("class", "task");
        taskElement.innerHTML = task;

        //element append
        taskList.appendChild(taskElement);
        inputBox.value = "";

        //element feature

        taskElement.addEventListener("dblclick", function () {
            
            // GET CONTENT AND REMOVE FROM ARRAY
            
            let task = taskElement.innerHTML;
            let idx = taskArr.indexOf(task);
            taskArr.splice(idx, 1);
            
            // WRITE BACK
            
            let stringArr = JSON.stringify(taskArr);
            localStorage.setItem("tasks", stringArr);    
            taskElement.remove();
        
        });
        inputBox.value = "";

    }
})
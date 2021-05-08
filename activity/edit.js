let lockBtn = document.querySelector(".lock");
let lockFlag = true;
let textBox = document.querySelector(".text-description");


lockBtn.addEventListener("click", function (event) {
    if (lockFlag) {
        lockBtn.classList.remove("fa-lock")
        lockBtn.classList.add("fa-lock-open");
        textBox.setAttribute("contenteditable","true");
        
    }
    else {
        lockBtn.classList.remove("fa-lock-open")
        lockBtn.classList.add("fa-lock");
        textBox.setAttribute("contenteditable","false");
    }
    lockFlag = !lockFlag;
})
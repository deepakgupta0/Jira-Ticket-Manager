let lockBtn = document.querySelector(".lock");
let lockFlag = true;
let textBox = document.querySelectorAll(".text-description");


lockBtn.addEventListener("click", function (event) {
    if (lockFlag) {
        lockBtn.classList.remove("fa-lock")
        lockBtn.classList.add("fa-lock-open");
        for (let i = 0; i < textBox.length; i++) {
            textBox[i].setAttribute("contenteditable","true");
        }
        
    }
    else {
        lockBtn.classList.remove("fa-lock-open")
        lockBtn.classList.add("fa-lock");
        for (let i = 0; i < textBox.length; i++) {
            textBox[i].setAttribute("contenteditable","false");
        }
        
    }
    lockFlag = !lockFlag;
})
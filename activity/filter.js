// ADDING FILTER ON FILTER COLORS

let filter = document.querySelectorAll(".filter-colors");

for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener("click", function () {
        let childList = filter[i].children[0];
        let selectedColor = childList.classList[0];
        if (selectedColor != "black")
            selectedColor = "light" + selectedColor;
        console.log(selectedColor);

        let allTicketArray = mainContainer.querySelectorAll(".ticket-container");
        // console.log(allTicketArray);
        allTicketArray.forEach(element => {
            // console.log(element.children[0].classList[1]);
            if (selectedColor != element.children[0].classList[1]) {
                element.style.display = "none";
            }
            else {
                element.style.display = "block";
            }
        });

    });

    // FOR DISABLING FILTER DBLCLICK ON ANY FILTER COLOR TWICE

    filter[i].addEventListener("dblclick", function () {
        let allTicketArray = mainContainer.querySelectorAll(".ticket-container");
        // console.log(allTicketArray);
        allTicketArray.forEach(element => {
            element.style.display = "block";
        });

    })
}
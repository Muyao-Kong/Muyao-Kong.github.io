const logoImg = document.querySelector(".logo");

function logoToHomepage(){
    logoImg.addEventListener("click", () => {
        window.location.href = "./index.html";
    });
}

logoToHomepage();

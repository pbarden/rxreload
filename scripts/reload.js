function swap_bg(color, image) {
    var new_bg_color = color;
    var new_bg_image = image;
    var data_bg = document.getElementById("body_bg");
    var data_image = document.getElementById("site_bg");
    data_bg.style.backgroundColor = new_bg_color;
    data_image.setAttribute("src", new_bg_image);
}

function show_me() { 
    for(var t=document.getElementsByClassName("hidden"),e=0;e<t.length;e++){
        t[e].style.display = "inline";
    }
}

// function to open modal by id
function showModal(itemId) {
    document.getElementById(itemId).style.display="block";
}

// function to close modal by id
function closeModal(itemId) {
    document.getElementById(itemId).style.display="none";
}
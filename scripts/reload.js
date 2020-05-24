function swap_bg(color, image) {
    var new_bg_color = color;
    var new_bg_image = image;
    var data_bg = document.getElementById("body_bg");
    var data_image = document.getElementById("site_bg");
    data_bg.style.backgroundColor = new_bg_color;
    data_image.setAttribute("src", new_bg_image);
}
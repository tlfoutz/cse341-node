const elem = document.getElementById("mailType");
elem.onchange = function(){
    let hiddenDiv = document.getElementById("zone");
    hiddenDiv.style.display = (this.value == "fcpsr") ? "none":"block";
};
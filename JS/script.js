var site_name = document.querySelector("#bookmark_name");
var site_url = document.querySelector("#bookmark_url");
var table = document.querySelector(".table tbody");
var warning_box = document.querySelector(".warning_box");
var close_button = document.querySelector(".close_btn");

var sites_list;

if (localStorage.getItem("sites_list")) {
    sites_list = JSON.parse(localStorage.getItem("sites_list"));
    displaySites(sites_list);
} else {
    sites_list = []
}

function addSite() {
    if (nameValidation() && urlValidation()) {
        site = {
            name: site_name.value,
            url: site_url.value
        };
        sites_list.push(site);
        displaySites(sites_list);
        saveToLocalStorage()
        clearInputs();
    }else{
        warning_box.classList.add("d-block");
        warning_box.classList.remove("d-none");
    }
}


function displaySites(slist) {

    table.innerHTML = "";
    for (var i = 0; i < slist.length; i++) {
        cartoona = `
              <td>${i + 1}</td>
              <td>${capitalize(slist[i].name)}</td>
              <td>
                <button type="button" class="btn btn_visit" onclick = "visitSite(${i})">
                  <i class="fa-solid fa-eye pe-1"></i>
                  Visit
                </button>
              </td>
              <td>
                <button type="button" class="btn btn_delete" onclick = "deleteSite(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
              </td>`
        row = document.createElement("tr");
        row.innerHTML = cartoona;
        table.appendChild(row);
    }
}

function clearInputs() {
    site_name.value = '';
    site_url.value = '';
    site_name.classList.remove("is-valid");
    site_url.classList.remove("is-valid");

}

function deleteSite(index) {
    sites_list.splice(index, 1);
    displaySites(sites_list);
    saveToLocalStorage();
}

function visitSite(index) {
    var regex = /^www/
    if (regex.test(sites_list[index].url)) {
        window.open("https://" + sites_list[index].url);
    }
    window.open(sites_list[index].url);
}


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function saveToLocalStorage() {
    localStorage.setItem("sites_list", JSON.stringify(sites_list));
}

// To validate input
site_name.addEventListener("input", function(){
    nameValidation();
})

site_url.addEventListener("input", function(){
    urlValidation();
})

// To close warning box
function closeModal() {
    warning_box.classList.add("d-none");
    warning_box.classList.remove("d-block");
}

close_button.addEventListener("click", function () {
    closeModal();
})

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
})

document.addEventListener("click", function(e){
    if(e.target.classList.contains("warning_box")){
        closeModal();
    }
})


// Validation Section
function nameValidation() {
    var regex = /^\w{3,}(\s+\w+)*$/;
    if (regex.test(site_name.value)) {
        site_name.classList.add("is-valid");
        site_name.classList.remove("is-invalid");
      
        return true;
    } else {
        site_name.classList.add("is-invalid");
        site_name.classList.remove("is-valid");
        
        return false;
    }
}

function urlValidation() {
    var regex = /^(https?:\/\/)*(w{3}\.)?[\w\-]+(\.[\w\-]+)+([\/#?].*)?$/;
    if (regex.test(site_url.value)) {
        site_url.classList.add("is-valid");
        site_url.classList.remove("is-invalid");
        return true;
    } else {
        site_url.classList.add("is-invalid");
        site_url.classList.remove("is-valid");
        return false;
    }
}
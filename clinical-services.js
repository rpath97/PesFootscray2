

//side menu bar appearing
function handleClinicalServicesClick() {
    
    //setting previous and current page
    previous_page = current_page;
    current_page = "clinicalservices_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    document.getElementById("clinical-sharing-button").focus();

}

function openClicnicalCasting() {
    setRcControlAll()
    switchToHDMI1()
}


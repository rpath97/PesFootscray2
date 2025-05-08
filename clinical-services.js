//side menu bar appearing
function handleClinicalServicesClick() {
    
    //setting previous and current page
    previous_page = current_page;
    current_page = "clinicalservices_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'flex';

    //document.getElementById("clinical-sharing-button").focus();

}

function openClicnicalCasting() {
    //setting previous and current page
    previous_page = current_page;
    current_page = "clinical_casting";

    setBackHomeVirtual(); //sets all buttons except back and home to virtual keys
    switchToHDMI1();
}

function openClinicalSharingHDMI() {
    // Set navigation state
    previous_page = current_page;
    current_page = "clinical_casting";

    // Set virtual keys so only back and home work
    setBackHomeVirtual();

    // Switch TV to HDMI1 input
    switchToHDMI1();
}


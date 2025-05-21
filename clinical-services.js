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

function openClinicalSharing() {
    // Set previous and current page
    console.log('openClinicalSharing() called');
    previous_page = current_page;
    current_page = "clinical_casting";
    setBackHomeVirtual(); // Only back and home keys work
    switchToHDMI1(); // Switch to HDMI1 input
}


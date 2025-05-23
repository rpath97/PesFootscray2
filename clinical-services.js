//side menu bar appearing
function handleClinicalServicesClick() {
    
    //setting previous and current page
    previous_page = current_page;
    current_page = "clinicalservices_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'flex';

    //document.getElementById("clinical-sharing-button").focus();

}

// This function is replaced by enterClinicalSharing
// function openClicnicalCasting() {
//     //setting previous and current page
//     previous_page = current_page;
//     current_page = "clinical_casting";
// 
//     setBackHomeVirtual(); //sets all buttons except back and home to virtual keys
//     switchToHDMI1();
// }

/**
 * Call this when the user selects the Clinical-Sharing tile
 * from the Clinical Services submenu that comes from the API
 */
function enterClinicalSharing() {
    console.log('enterClinicalSharing() called');
    
    // Update navigation state
    previous_page = current_page;
    current_page = "clinical_sharing"; // Using clinical_sharing to match the handleBackNavigation function
    
    // Hide the current view (clinicalservices_menu)
    if (document.getElementById(previous_page)) {
        document.getElementById(previous_page).style.display = 'none';
    }
    
    // Make sure BACK and MENU are forwarded even during HDMI display
    enableBackKeyForwarding();
    
    // 1. Switch to HDMI1
    sendWIxPCommand({
        Svc: "WIXP",
        SvcVer: "4.0",
        Cookie: 151,
        CmdType: "Change",
        Fun: "Source",
        CommandDetails: {
            TuneToSource: "HDMI1"
        }
    });
    
    // Deactivate dashboard when going to HDMI1
    changeCDBstate('Deactivate');
}

/**
 * Call this from keyHandler when VK_BACK is received
 * while in the hdmi_view state for clinical sharing
 */
function exitClinicalSharing() {
    console.log('exitClinicalSharing() called');
    
    // Use the shared function to bring dashboard back to foreground
    foregroundDashboard();
    
    // Reset controls
    setRcControlSelective();
    
    // Update UI state - show the clinical services menu from the API
    if (document.getElementById("clinicalservices_menu")) {
        document.getElementById("clinicalservices_menu").style.display = "flex";
    }
    
    // Focus the submenu card if we know its ID
    if (activeSubmenuId) {
        const submenuSelector = `[id="${activeSubmenuId}"]`;
        const submenuCard = document.querySelector(submenuSelector);
        if (submenuCard) {
            submenuCard.focus();
        }
    }
    
    current_page = "clinicalservices_menu";
    previous_page = "default_view";
    
    // Reactivate dashboard UI
    changeCDBstate('Activate');
}

// Legacy function for backward compatibility
function openClinicalSharing() {
    console.log('openClinicalSharing() called - redirecting to enterClinicalSharing()');
    enterClinicalSharing();
}


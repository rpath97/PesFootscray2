//side menu bar appearing
function handleClinicalServicesClick() {
    console.log('Clinical Services button clicked');
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }

    // Hide default view
    const defaultView = document.querySelector('.default-view');
    if (defaultView) {
        defaultView.style.display = 'none';
    }
    
    // Show entertainment view
    const entertainmentView = document.querySelector('.entertainment-view');
    if (entertainmentView) {
        entertainmentView.style.display = 'none';
    }
    
    // Show my care view
    const myCareView = document.querySelector('.my-care-view');
    if (myCareView) {
        myCareView.style.display = 'none';
    }
    
    // Show hospital info view
    const hospitalInfoView = document.querySelector('.hospital-info-view');
    if (hospitalInfoView) {
        hospitalInfoView.style.display = 'none';
    }   

    // Show clinical services view
    const clinicalView = document.querySelector('.clinical-services-view');
    if (clinicalView) {
        clinicalView.style.display = 'block';
    }

    // Focus clinical sharing button
    const clinicalSharingButton = document.getElementById("clinical-sharing-button");
    clinicalSharingButton.focus();
}

// Handle keyboard navigation
function handleClinicalServicesKeys(keyCode) {
    const currentFocus = document.activeElement;
    
    if (currentFocus.id === 'clinical-sharing-button') {
        switch(keyCode) {
            case 37: // Left arrow
                const clinicalServicesButton = document.querySelector('.menu-item[data-type="clinical-services"]');
                if (clinicalServicesButton) {
                    clinicalServicesButton.focus();
                    return 0; // Key handled
                }
                break;
        }
    }
    return 1; // Key not handled
}

// Add this to your existing event listeners
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.clinical-services-view').style.display === 'block') {
        handleClinicalServicesKeys(e.keyCode);
    }
}); 


// function handleClinicalServicesClick() {
//     console.log('Clinical Services button clicked');
    
//     // Hide default view
//     const defaultView = document.querySelector('.default-view');
//     if (defaultView) {
//         defaultView.style.display = 'none';
//     }

//     // Show clinical services view
//     const clinicalView = document.querySelector('.clinical-services-view');
//     if (clinicalView) {
//         clinicalView.style.display = 'block';
//     }

//     // Rest of the function remains the same...
// } 


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

    // Show clinical services view
    const clinicalView = document.querySelector('.clinical-services-view');
    if (clinicalView) {
        clinicalView.style.display = 'block';
    }

    // Rest of the function remains the same...
} 


// Track active section
let currentSection = 'default';

// Menu click handlers
function handleMenuClick(section, event) {
    console.log('Menu click:', section);
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked item
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Hide all content sections
    document.querySelectorAll('.content').forEach(content => {
        content.style.display = 'none';
    });

    // Show selected section
    if (section === 'entertainment') {
        document.querySelector('.entertainment-view').style.display = 'block';
        currentSection = 'entertainment';
        
        // Focus first entertainment card
        setTimeout(() => {
            const firstCard = document.querySelector('.entertainment-card');
            if (firstCard) {
                firstCard.focus();
            }
        }, 100);
    } else {
        document.querySelector('.default-view').style.display = 'block';
        currentSection = 'default';
    }
}

// Function to return to home/default view
function returnToHome() {
    JAPITReturnToHome();
}

// Handle hospital info button click
function handleHospitalInfoClick() {
    console.log('Opening Hospital Info...');
    
    // Hide default view
    document.querySelector('.default-view').style.display = 'none';
    
    // Show hospital info view
    const hospitalInfoView = document.querySelector('.hospital-info-view');
    if (hospitalInfoView) {
        hospitalInfoView.style.display = 'block';
    }
    
    // Keep sidebar visible
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }
    
    // Update button states
    const hospitalInfoButton = document.getElementById('hospitalInfoButton');
    if (hospitalInfoButton) {
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to hospital info button
        hospitalInfoButton.classList.add('active');
    }

    // Focus first hospital info card
    setTimeout(() => {
        const firstCard = document.querySelector('.hospital-info-card[data-type="welcome"]');
        if (firstCard) {
            firstCard.focus();
        }
    }, 100);
}

// Handle entertainment button click specifically
function handleEntertainmentClick() {
    console.log('Entertainment button clicked');
    
    // Hide default view (main image)
    const defaultView = document.querySelector('.default-view');
    if (defaultView) {
        defaultView.style.display = 'none';
    }

    // Hide sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }

    // Show entertainment view
    const entertainmentView = document.querySelector('.entertainment-view');
    if (entertainmentView) {
        entertainmentView.style.display = 'block';
    }

    // Adjust main content to full width
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.marginLeft = '0';
        mainContent.style.width = '100%';
    }

    // Update current section
    currentSection = 'entertainment';

    // Update button states
    const entertainmentButton = document.getElementById('entertainmentButton');
    if (entertainmentButton) {
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to entertainment button
        entertainmentButton.classList.add('active');
    }

    // Focus first entertainment card
    setTimeout(() => {
        const firstCard = document.querySelector('.entertainment-card');
        if (firstCard) {
            firstCard.focus();
        }
    }, 100);

    console.log('Switched to entertainment view');
}

// function handleMyCareClick() {
//     console.log('My Care button clicked');
    
//     // Hide default view (main image)
//     const defaultView = document.querySelector('.default-view');
//     if (defaultView) {
//         defaultView.style.display = 'none';
//     }

//     // Hide sidebar
//     const sidebar = document.querySelector('.sidebar');
//     if (sidebar) {
//         sidebar.style.display = 'none';
//     }

//     // Show my care view
//     const myCareView = document.querySelector('.my-care-view');
//     if (myCareView) {
//         myCareView.style.display = 'block';
//     }

//     // Adjust main content to full width
//     const mainContent = document.querySelector('.main-content');
//     if (mainContent) {
//         mainContent.style.marginLeft = '0';
//         mainContent.style.width = '100%';
//     }

//     // Update current section
//     currentSection = 'my-care';

//     // Focus first my care card
//     setTimeout(() => {
//         const firstCard = document.querySelector('.mycare-card');
//         if (firstCard) {
//             firstCard.focus();
//         }
//     }, 100);

//     console.log('Switched to my care view');
// }

// function handleClinicalServicesClick() {
//     console.log('Clinical Services button clicked');
    
//     // Hide default view (main image)
//     const defaultView = document.querySelector('.default-view');
//     if (defaultView) {
//         defaultView.style.display = 'none';
//     }

//     // Hide sidebar
//     const sidebar = document.querySelector('.sidebar');
//     if (sidebar) {
//         sidebar.style.display = 'none';
//     }

//     // Show clinical services view
//     const clinicalView = document.querySelector('.clinical-services-view');
//     if (clinicalView) {
//         clinicalView.style.display = 'block';
//     }

//     // Adjust main content to full width
//     const mainContent = document.querySelector('.main-content');
//     if (mainContent) {
//         mainContent.style.marginLeft = '0';
//         mainContent.style.width = '100%';
//     }

//     // Update current section
//     currentSection = 'clinical-services';

//     // Focus clinical sharing card
//     setTimeout(() => {
//         const firstCard = document.querySelector('.clinical-card');
//         if (firstCard) {
//             firstCard.focus();
//         }
//     }, 100);

//     console.log('Switched to clinical services view');
// } 
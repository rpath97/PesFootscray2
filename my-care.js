function handleMyCareClick() {
    console.log('Opening My Care...');
    
    // Hide all views first
    document.querySelectorAll('.content').forEach(view => {
        if (view) {
            view.style.display = 'none';
        }
    });

    // Keep sidebar visible
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'block';
    }

    // Show My Care view
    const myCareView = document.querySelector('.my-care-view');
    if (myCareView) {
        myCareView.style.display = 'block';
        myCareView.style.marginLeft = '15%'; // Align with sidebar
    }

    // Update current section
    currentSection = 'my-care';

    // Update button states
    const myCareButton = document.getElementById('myCareButton');
    if (myCareButton) {
        // Remove active class from all menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        // Add active class to My Care button
        myCareButton.classList.add('active');
    }

    // Focus first My Care card
    setTimeout(() => {
        const firstCard = document.querySelector('.mycare-card[data-type="sample1"]');
        if (firstCard) {
            // Set JAPIT focus
            var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
            JAPITObjForWIXPSvc.Cookie = 3041;
            JAPITObjForWIXPSvc.CmdType = "Change";
            JAPITObjForWIXPSvc.Fun = "UserInputControl";
            JAPITObjForWIXPSvc.CommandDetails = {
                "FocusSettings": {
                    "SetFocusTo": "sample1"
                }
            };
            sendWIxPCommand(JAPITObjForWIXPSvc);
            delete JAPITObjForWIXPSvc;
            
            firstCard.focus();
        }
    }, 100);

    // Register JAPIT focus handling
    handleMyCareFocus();
}

// Card click handlers
function handleSample1Click() {
    console.log('Opening Sample 1...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="sample1"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleSample2Click() {
    console.log('Opening Sample 2...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="sample2"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleSample3Click() {
    console.log('Opening Sample 3...');
    clearMyCareActive();
    const card = document.querySelector('.mycare-card[data-type="sample3"]');
    if (card) {
        card.classList.add('active');
    }
}

function clearMyCareActive() {
    document.querySelectorAll('.mycare-card').forEach(card => {
        card.classList.remove('active');
    });
}

// JAPIT focus handling
function handleMyCareFocus() {
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 3040;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "UserInputControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "FocusSettings": {
            "FocusMode": "Explicit",
            "ElementsToFocus": [
                { 
                    "ElementId": "sample1", 
                    "NextUp": "myCareButton", 
                    "NextDown": "sample2", 
                    "NextLeft": "sample3", 
                    "NextRight": "sample2" 
                },
                { 
                    "ElementId": "sample2", 
                    "NextUp": "sample1", 
                    "NextDown": "sample3", 
                    "NextLeft": "sample1", 
                    "NextRight": "sample3" 
                },
                { 
                    "ElementId": "sample3", 
                    "NextUp": "sample2", 
                    "NextDown": "myCareButton", 
                    "NextLeft": "sample2", 
                    "NextRight": "sample1" 
                }
            ]
        }
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Handle keyboard navigation
function handleMyCareKeys(keyCode) {
    const currentFocus = document.activeElement;

    if (currentFocus.classList.contains('mycare-card')) {
        const currentType = currentFocus.getAttribute('data-type');
        let nextId;

        switch (keyCode) {
            case 37: // Left
                nextId = currentFocus.getAttribute('data-next-left');
                break;
            case 38: // Up
                nextId = currentFocus.getAttribute('data-next-up');
                break;
            case 39: // Right
                nextId = currentFocus.getAttribute('data-next-right');
                break;
            case 40: // Down
                nextId = currentFocus.getAttribute('data-next-down');
                break;
        }

        if (nextId) {
            const nextElement = document.getElementById(nextId);
            if (nextElement) {
                nextElement.focus();
                return 0;
            }
        }
    }
    return 1;
}

// Additional Code for MyCare Section

// Function to handle MyCare button click
function handleMyCareButtonClick() {
    document.querySelector('.default-view').style.display = 'none';
    document.querySelector('.my-care-view').style.display = 'block';
    const myCareFirstElement = document.getElementById('myCareFirstButton');
    if (myCareFirstElement) {
        myCareFirstElement.focus();
    }

    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 2025;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ApplicationControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "ApplicationDetails": {
            "ApplicationName": "MyCare"
        },
        "ApplicationState": "Active"
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

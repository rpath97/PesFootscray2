

function loadMainMenu(data) {
    const mainMenuButtons = [];
    for (var i = 0; i < data.length; i++) {
        const title = data[i].title;
        mainMenuButtons.push(title);

        const entertainmentButton = document.getElementById('entertainmentButton');
        const clinicalServiceButton = document.querySelector('.menu-item.japit-button[data-type="clinical-services"]');
        const hospitalInfoButton = document.querySelector('.menu-item.japit-button[data-type="hospitalinfo"]');
        const entertainmentButtonSubmenu = document.querySelector('.submenu-card')
        const colourScheme = data[i].colorScheme.selectionColor;
        const hoverColour = data[i].colorScheme.baseColor;

        if (title.toLowerCase().includes('entertainment')) {
            entertainmentButton.style.display = 'flex';
            const img = entertainmentButton.getElementsByTagName("img")[0];
            const span = entertainmentButton.getElementsByTagName("span")[0];
            if (data[i].icon.imageUrl){
                img.src = data[i].icon.imageUrl;
            }
            if (colourScheme){
                //span.style.color = data[i].colorScheme.selectionColor;
                entertainmentButton.addEventListener("focus", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = hoverColour; // Change text color on focus
                    }
                });
            
                entertainmentButton.addEventListener("blur", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = colourScheme; // Reset text color on blur
                    }
                });
            }
            //adding submenu color
            document.querySelectorAll(".submenu-card").forEach(function(card) {
                card.tabIndex = 0; // Make focusable in Opera v32
            
                card.addEventListener("focus", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = hoverColour; // Change text color on focus
                    }
                });
            
                card.addEventListener("blur", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = colourScheme; // Reset text color on blur
                    }
                });
            });
            
            
        } else if (title.toLowerCase().includes('clinical')) {
            // CLINICAL SERVICE MAIN MENU BUTTON
            clinicalServiceButton.style.display = 'flex';
            const img = clinicalServiceButton.getElementsByTagName("img")[0];
            const span = clinicalServiceButton.getElementsByTagName("span")[0];
            if (data[i].icon.imageUrl){
                img.src = data[i].icon.imageUrl;
            }
            if (colourScheme){
                //span.style.color = data[i].colorScheme.selectionColor;
                clinicalServiceButton.addEventListener("focus", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = hoverColour; // Change text color on focus
                    }
                });
            
                clinicalServiceButton.addEventListener("blur", function() {
                    var span = this.querySelector("span");
                    if (span) {
                        span.style.color = colourScheme; // Reset text color on blur
                    }
                });
            }
            //adding submenu color
            // document.querySelectorAll(".submenu-card4").forEach(function(card) {
            //     card.tabIndex = 0; // Make focusable in Opera v32
            
            //     card.addEventListener("focus", function() {
            //         var span = this.querySelector("span");
            //         if (span) {
            //             span.style.color = hoverColour; // Change text color on focus
            //         }
            //     });
            
            //     card.addEventListener("blur", function() {
            //         var span = this.querySelector("span");
            //         if (span) {
            //             span.style.color = colourScheme; // Reset text color on blur
            //         }
            //     });
            // });
        } else if (title.toLowerCase().includes('hospital')) {
             // HOSPITAL INFO MAIN MENU BUTTON
             hospitalInfoButton.style.display = 'flex';
             const img = hospitalInfoButton.getElementsByTagName("img")[0];
             const span = hospitalInfoButton.getElementsByTagName("span")[0];
             if (data[i].icon.imageUrl){
                 img.src = data[i].icon.imageUrl;
             }
             if (colourScheme){
                 //span.style.color = data[i].colorScheme.selectionColor;
                 hospitalInfoButton.addEventListener("focus", function() {
                     var span = this.querySelector("span");
                     if (span) {
                         span.style.color = hoverColour; // Change text color on focus
                     }
                 });
             
                 hospitalInfoButton.addEventListener("blur", function() {
                     var span = this.querySelector("span");
                     if (span) {
                         span.style.color = colourScheme; // Reset text color on blur
                     }
                 });
             }
             //SUB MODULES
             const subModulesData = data[i].subModules;
             for (var j = 0; j < subModulesData.length; j++) {
                // Create the parent div
                const hospMenu = document.getElementById('hospitalinfo_menu');
                const subMenuButtons = document.createElement('div');
                subMenuButtons.className = 'sub-menu-buttons';

                // Create the button element
                const button = document.createElement('button');
                button.className = 'submenu-card2';
                button.id = subModulesData[j].id;
                button.setAttribute('button-focus', subModulesData[j].title.split(' ').join(''));

                //MODULE ACTION
                const moduleAction = subModulesData[j].moduleAction.packageName;
                if (moduleAction && moduleAction.includes('video')) {
                    const videoApi = subModulesData[j].moduleAction.moduleUrl;
                    const videourl = apiGetCall(videoApi, 'submenu');
                    if (videourl){
                        console.log(JSON.parse(videourl));
                    }
                    
                }

                // button.onclick = handleManagementandDischargeClick;

                // Create the image element
                const img = document.createElement('img');
                img.src = subModulesData[j].icon.imageUrl;                ;
                img.alt = subModulesData[j].title;

                //console.log("Focused image ", subModulesData[j].icon.focusedImageUrl)
                // Apply hover effects on focus
                button.addEventListener('focus', function() {
                    img.src = subModulesData[j].icon.focusedImageUrl;
                    img.style.transform = "scale(1.1)";
                });

                // Revert on blur (when focus is lost)
                button.addEventListener('blur', function() {
                    img.src = subModulesData[j].icon.imageUrl; 
                    img.style.transform = "scale(1)";
                });

                // Create the text span
                const span = document.createElement('span');
                span.textContent = subModulesData[j].title;

                // Append image and span to the button
                button.appendChild(img);
                button.appendChild(span);

                // Append button to the parent div
                subMenuButtons.appendChild(button);

                // Now you can append subMenuButtons to wherever it needs to go in your DOM
                // For example:
                hospMenu.appendChild(subMenuButtons); // Or any other parent element
             }
        }
    }

    console.log(mainMenuButtons); // Output: ["Alice", "Bob", "Charlie"]
}
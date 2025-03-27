

function loadMainMenu(data) {
    console.log("hello");
    const mainMenuButtons = [];
    for (var i = 0; i < data.length; i++) {
        var title = data[i].title;
        mainMenuButtons.push(title);

        console.log("TItle ", title);

        const entertainmentButton = document.getElementById('entertainmentButton');
        const clinicalServiceButton = document.querySelector('.menu-item.japit-button[data-type="clinical-services"]');
        const hospitalInfoButton = document.querySelector('.menu-item.japit-button[data-type="hospitalinfo"]');
        const entertainmentButtonSubmenu = document.querySelector('.submenu-card');
        const colourScheme = data[i].colorScheme.selectionColor;
        const hoverColour = data[i].colorScheme.baseColor;

        if (title.toLowerCase().includes('entertainment')) {
            entertainmentButton.style.display = 'flex';
            var img = entertainmentButton.getElementsByTagName("img")[0];
            var span = entertainmentButton.getElementsByTagName("span")[0];
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
            var cards = document.querySelectorAll(".submenu-card");
            for (var j = 0; j < cards.length; j++) {
                var card = cards[j];
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
            }
            
            
         } else if (title.toLowerCase().includes('clinical')) {
            // CLINICAL SERVICE MAIN MENU BUTTON
            clinicalServiceButton.style.display = 'flex';
            var img = clinicalServiceButton.getElementsByTagName("img")[0];
            var span = clinicalServiceButton.getElementsByTagName("span")[0];
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
             var img = hospitalInfoButton.getElementsByTagName("img")[0];
             var span = hospitalInfoButton.getElementsByTagName("span")[0];
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
             var subModulesData = data[i].subModules;
             for (var j = 0; j < subModulesData.length; j++) {
                // Create the parent div
                var hospMenu = document.getElementById('hospitalinfo_menu');
                var subMenuButtons = document.createElement('div');
                subMenuButtons.className = 'sub-menu-buttons';

                // Create the button element
                var button = document.createElement('button');
                button.className = 'submenu-card2';
                button.id = subModulesData[j].id;
                button.setAttribute('button-focus', subModulesData[j].title.split(' ').join(''));

                //MODULE ACTION
                var moduleAction = subModulesData[j].moduleAction.packageName;
                if (moduleAction && moduleAction.includes('video')) {
                    var videoApi = subModulesData[j].moduleAction.moduleUrl;
                    var videourl = '';
                    apiGetCall(videoApi, 'submenu', function(response) {
                        if (response) {
                            console.log('API Response:', response);
                            // Process the response here (e.g., parse JSON)
                            videourl = response;
                            
                        } else {
                            console.log('API request failed');
                        }
                    });
                    if (videourl){
                        console.log(JSON.parse(videourl));
                    }
                    
                }

                // button.onclick = handleManagementandDischargeClick;

                // Create the image element
                var img = document.createElement('img');
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
                var span = document.createElement('span');
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
        }  else {
            var menuItemData = data[i];
            var colorScheme = data[i].colorScheme;
            var button = document.createElement('button');
            button.className = 'menu-item japit-button';
            button.id = menuItemData.title.split(' ').join('');

            // 2. Set data attributes (Opera 32 supports dataset or setAttribute)
            button.setAttribute('data-type', button.id);
            button.setAttribute('data-japit-control', 'true');
            button.setAttribute('data-japit-focusable', 'true');
            button.setAttribute('data-action', button.id);

            // 2. Style the span element (assuming you created it)
            var span = document.createElement('span');
            span.textContent = menuItemData.title;
            span.style.color = colorScheme.selectionColor;

            // Add image and text
            var img = document.createElement('img');
            img.src = menuItemData.icon.imageUrl;
            img.alt = menuItemData.title;

            
            button.appendChild(img);
            button.appendChild(span);

            // Repeat similar for focus/blur events
            // Use a CLOSURE to capture the correct values for each button
            (function(btn, scheme, itemData) {
                btn.addEventListener('focus', function() {
                    if (!this.classList.contains('active')) {
                        this.style.background = 'linear-gradient(135deg, ' + scheme.selectionColor + ', ' + scheme.selectionColor + ')';
                        this.style.color = scheme.selectionColor.baseColor;
                        this.style.transform = 'scale(1.02)';
                        this.style.boxShadow = '0 4px 8px rgba(3, 95, 3, 0.2)';
                        
                        var btnImg = this.querySelector('img');
                        btnImg.src = itemData.icon.focusedImageUrl;
                        btnImg.style.transform = 'scale(1.1)';
                        
                        var btnSpan = this.querySelector('span');
                        btnSpan.style.color = scheme.baseColor;
                    }
                });

                btn.addEventListener('blur', function() {
                    if (!this.classList.contains('active')) {
                        this.style.background = '';
                        this.style.color = '';
                        this.style.transform = '';
                        this.style.boxShadow = '';
                        
                        var btnImg = this.querySelector('img');
                        btnImg.src = itemData.icon.imageUrl;
                        btnImg.style.transform = '';
                        
                        var btnSpan = this.querySelector('span');
                        btnSpan.style.color = scheme.selectionColor;
                    }
                });
            })(button, colorScheme, menuItemData); // Pass current loop values to the closure

            
            // Add to container (replace with your actual container)
            document.querySelector('.sidebar-menu').appendChild(button);
                    
        }
    }

 
}
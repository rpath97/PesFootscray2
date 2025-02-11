// Convert excel with radio channel details to json format, then extracts information about each channels
// Then creates JAPIT objects for each radio channel and sends it to the tv
// Author: Hanson Wilson
// Date: 03/10/2024


var default_chan_no = 200;
var channel_list = [];
radio_channel_on = 0;


function openRadio() {
    const directoryPath = './channel_logos/'; // 
    const targetFilename = 'sbs popasia.png'; // Replace with the filename you're looking for
    

    //Ensuring multiple clicks of the button consecutively doesn't keep on removing and adding channels
    if (radio_channel_on == 0){
        radio_channel_on = 1;
        removeChannels();
        channel_list = [];
        // Arrays that will hold the values form the json data extracted from excel
        var channelNo_arr = [];
        var channelName_arr = [];
        var channelIP_arr = [];

        // Creating Channels JAPIT Object
        var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
        JAPITObjForWIXPSvc.Cookie = 16;
        JAPITObjForWIXPSvc.CmdType = "Change";
        JAPITObjForWIXPSvc.Fun = "ChannelList";
        JAPITObjForWIXPSvc.CommandDetails = {
                "AddChannels": []
        };
        // Extracting excel data and converting it to json format
        const filePath = 'radiochannels.xlsx';
            fetch(filePath)
                .then(response => response.arrayBuffer()) //is a chain of promises using the .then() method in JavaScript. It is commonly used in combination with the Fetch API to handle the response from a network request.
                .then(buffer => {
                    const data = new Uint8Array(buffer); //This method is used on the response object to read the response body as an ArrayBuffer. An ArrayBuffer is a binary data buffer, often used for handling binary data such as images or, in this case, the binary data of an Excel file.
                    //console.log("data: " + data);
                    // Use SheetJS to parse the Excel data
                    // debugger
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);
                    // looping through the different channel data and creating japit objects
                    for (let i = 0; i < jsonData.length; i++) {
                        channelNo_arr[i] = jsonData[i].Chan_No;
                        channelName_arr[i] = jsonData[i].Chan_name;
                        channelIP_arr[i] = jsonData[i].Chan_IP;

                        // Creating channel objecy
                        const chan = {
                            "BasicChannelDetails": {
                                "ChannelNo": Number(channelNo_arr[i]),
                                "ChannelName": channelName_arr[i],
                                "ChannelType": "IP"
                            },
                            "ChannelTuningDetails": {
                                "URL": "multicast://" + channelIP_arr[i]+"/0/0/0"
                            }
                        };
                        // Pushing channel object to JAPIT channel object           
                        JAPITObjForWIXPSvc.CommandDetails.AddChannels.push(chan);
                        if (radio_channel_on == 1){
                            channel_list.push(chan);
                        }
                        
                    }
                    //Sending final list of channels to the tv
                    sendWIxPCommand(JAPITObjForWIXPSvc);
                    delete JAPITObjForWIXPSvc;
                    
                    
                    //Ensuring that the default chanenl number is one from the list added
                    default_chan_no = channelNo_arr[Math.floor(jsonData.length/2)];

                    //Creating Hiding home dashbaord view and show radio view
                    document.getElementById("nav").style.display = "none";
                    document.getElementById("patientMenu").style.display = "none";
                    document.getElementById("gallery").style.display = "none";
                    document.getElementById("left-column").style.display = "flex";

                    const leftColumn = document.getElementById("left-column");
                    
                    const gifTitle = document.getElementById("gif-title");
                    
                    channel_list.forEach(button => {
                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add('radio-button-container');

                        const btnElement = document.createElement('button');
                        btnElement.id = button.BasicChannelDetails.ChannelName;
                        // btnElement.class = 'radio_chan_btn';
                        btnElement.classList.add('radio_chan_btn'); //adding a class for all channel buttons

                        // Create image element
                        //debugger;
                        var image = document.createElement("img");
                        const logoname = button.BasicChannelDetails.ChannelName + '.png';
                        const img_src = directoryPath + logoname;
                        console.log(img_src);
                        image.src = img_src.toLocaleLowerCase();
                        const img_url = image.src;
                        checkImageExists(img_url, function(exists) {
                            if (exists) {
                                console.log('Image exists.');
                            } else {
                                image.src = 'UI_images/radioicon2.png';
                                console.log('Image does not exist.');
                            }
                        });
                        console.log(image.src);
                        //image.src = img_src_decode;
                        image.style.width = "100px";
                        btnElement.appendChild(image);

                        // Create text element
                        
                        var textSpan = document.createElement("span");
                        textSpan.className = "buttonText";
                        textSpan.textContent = button.BasicChannelDetails.ChannelName;
                        btnElement.appendChild(textSpan);

                        btnElement.style.fontSize = "30px"; 
                        btnElement.style.margin = "30px"
                        // btnElement.style.display = "flex";
                        // btnElement.style.alignItems = "center";
                        // btnElement.style.justifyContent = "center";
                        btnElement.style.width = "200px";
                        btnElement.style.height = "180px";
                        btnElement.addEventListener('click', radio_ui);
                        

                        const titleElement = document.createElement('div');
                        //const logoElement = document.createElement('img');
                        titleElement.textContent = button.BasicChannelDetails.ChannelName;
                        

                        leftColumn.appendChild(btnElement);
                        //buttonContainer.appendChild(titleElement);

                        //leftColumn.appendChild(buttonContainer);
                    });
                    
                    document.getElementById(channel_list[0].BasicChannelDetails.ChannelName).focus();
                    mute("Off");
                })
            .catch(error => { //if the file coudl not be read
                
                document.getElementById("logmsgcallback").value += '\n' + 'file could not be read' + '\n';
                document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
            });

    } else {
        //Creating Hiding home dashbaord view and show radio view
		radio_channel_on = 1;
        document.getElementById("nav").style.display = "none";
        document.getElementById("patientMenu").style.display = "none";
        document.getElementById("gallery").style.display = "none";
        document.getElementById("radio_list").style.display = "flex";
		document.getElementById(channel_list[0].BasicChannelDetails.ChannelName).focus();
        mute("Off");
        
        // document.getElementById("left-column").style.display = "flex";
        // document.getElementById("back_button").style.display = "flex";
        // channel_list.forEach(button => {
        //     const btnElement = document.getElementById(button.BasicChannelDetails.ChannelName);
        //     // btnElement.style.display = "flex";
        //     // btnElement.addEventListener('click', radio_ui);
        //     btnElement.remove();
        // });
        // document.getElementsByClassName("radio-button-container");
        // channel_list.forEach(button => {
        //     const buttonContainer = document.createElement('div');
        //     buttonContainer.classList.add('radio-button-container');

        //     const btnElement = document.createElement('button');
        //     btnElement.id = button.BasicChannelDetails.ChannelName;
        //     btnElement.class = 'radio_chan_btn';

        //     // Create image element
        //     var image = document.createElement("img");
        //     image.src = "UI_images/radioicon2.png";
        //     image.style.width = "100px";
        //     btnElement.appendChild(image);

        //     // Create text element
        //     var textSpan = document.createElement("span");
        //     textSpan.className = "buttonText";
        //     textSpan.textContent = button.BasicChannelDetails.ChannelName;
        //     btnElement.appendChild(textSpan);

        //     //btnElement.innerHTML = `<img src="UI_images/radioicon2.png" id="${button.BasicChannelDetails.ChannelName} + img" alt="${button.BasicChannelDetails.ChannelName}" style="vertical-align: middle; margin-right: 10px; width: 100px"><span> ${button.BasicChannelDetails.ChannelName}</span>`;
        //     btnElement.style.fontSize = "30px"; 
        //     btnElement.style.margin = "30px"
        //     // btnElement.style.display = "flex";
        //     // btnElement.style.alignItems = "center";
        //     // btnElement.style.justifyContent = "center";
        //     btnElement.style.width = "200px";
        //     btnElement.style.height = "180px";
        //     btnElement.addEventListener('click', radio_ui);
        //     //debugger;
        //     //Getting Channel Logo
        //     channlName = button.BasicChannelDetails.ChannelName;
        //     //channelLogoFetch(channlName);
            

        //     const titleElement = document.createElement('div');
        //     titleElement.textContent = button.BasicChannelDetails.ChannelName;

        //     buttonContainer.appendChild(btnElement);
        //     //buttonContainer.appendChild(titleElement);

        //     leftColumn.appendChild(buttonContainer);
        // });
    }

    
    //Toggling tv/radio channel status
    if (tv_channel_on == 1){
        tv_channel_on = 0;
    } 


    mute("Off"); //turns audio on channels off when coming back to the dashbaord
    // Removing all previous channels, so that no radio channels will pop up
    
}

// function to check if channel logo exists in library
function checkImageExists(imageUrl, callback) {
    var img = new Image();
    img.onload = function() {
        // Image loaded successfully
        callback(true);
    };
    img.onerror = function() {
        // Image failed to load
        callback(false);
    };
    img.src = imageUrl;
}


//hardcoded channels in
// function openRadio_hardcoded() {
//     //Ensuring multiple clicks of the button consecutively doesn't keep on removing and adding channels
//     if (radio_channel_on == 0){
//         radio_channel_on = 1;
//     } else {
//         channelSelection(default_chan_no);
//         // switchSource('MainTuner');
//         tvChannelsApp('Activate');
//         return;
//     }

//     //Toggling tv/radio channel status
//     if (tv_channel_on == 1){
//         tv_channel_on = 0;
//     } 

//     mute("Off"); //turns audio on channels off when coming back to the dashbaord
//     // Removing all previous channels, so that no radio channels will pop up
//     removeChannels();

//     // Creating Channels JAPIT Object
//     var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
// 	JAPITObjForWIXPSvc.Cookie = 16;
// 	JAPITObjForWIXPSvc.CmdType = "Change";
// 	JAPITObjForWIXPSvc.Fun = "ChannelList";
//     JAPITObjForWIXPSvc.CommandDetails = {
//              "AddChannels": [
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 330,
//                         "ChannelName": "Double J",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.200:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 331,
//                         "ChannelName": "ABC Jazz",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.201:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 332,
//                         "ChannelName": "ABC KIDS Listen",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.202:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 333,
//                         "ChannelName": "triple j",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.28:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 334,
//                         "ChannelName": "triple j Unearthed",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.29:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 335,
//                         "ChannelName": "ABC Classic",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.27:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 336,
//                         "ChannelName": "ABC Country",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.203:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 337,
//                         "ChannelName": "ABC",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.25:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 338,
//                         "ChannelName": "ABC RN",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.26:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 339,
//                         "ChannelName": "ABC NewsRadio",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.204:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 550,
//                         "ChannelName": "SBS Radio 1",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.101:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 551,
//                         "ChannelName": "SBS Radio 2",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.102:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 552,
//                         "ChannelName": "SBS Radio 3",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.103:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 553,
//                         "ChannelName": "SBS Arabic24",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.104:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 554,
//                         "ChannelName": "SBS PopDesi",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.105:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 555,
//                         "ChannelName": "SBS Chill",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.106:1234/0/0/0"
//                     }
//                 },
//                 {
//                     "BasicChannelDetails": {
//                         "ChannelNo": 556,
//                         "ChannelName": "SBS PopAsia",
//                         "ChannelType": "IP"
//                     },
//                     "ChannelTuningDetails": {
//                         "URL": "multicast://239.1.3.107:1234/0/0/0"
//                     }
//                 },
                
//              ]
//     };
//     // Extracting excel data and converting it to json formta
//     sendWIxPCommand(JAPITObjForWIXPSvc);
// }

// Global variables for radio state
var default_radio_chan = 568;  // Default to ABC KIDS Listen (first channel)
var radio_channel_on = 0;
var radio_channel_list = [
    // Row 1
    { number: 568, name: "ABC KIDS Listen", ip: "239.1.3.202:1234", logo: "logos/ABC_KIDS_Listen.png", position: 1 },
    { number: 569, name: "triple j", ip: "239.1.3.28:1234", logo: "logos/triple_j.png", position: 2 },  // triple j configuration
    { number: 570, name: "triple j Unearthed", ip: "239.1.3.29:1234", logo: "logos/triple_j_Unearthed.png", position: 3 },
    // Row 2
    { number: 575, name: "ABC NewsRadio", ip: "239.1.3.204:1234", logo: "logos/ABC_NewsRadio.png", position: 4 },
    { number: 567, name: "ABC Jazz", ip: "239.1.3.201:1234", logo: "logos/ABC_Jazz.png", position: 5 },
    { number: 571, name: "ABC Classic", ip: "239.1.3.27:1234", logo: "logos/ABC_Classic.png", position: 6 },
    // Row 3
    { number: 574, name: "ABC RN", ip: "239.1.3.26:1234", logo: "logos/ABC_RN.png", position: 7 },
    { number: 572, name: "ABC Country", ip: "239.1.3.203:1234", logo: "logos/ABC_Country.png", position: 8 },
    { number: 566, name: "Double J", ip: "239.1.3.200:1234", logo: "logos/Double_J.png", position: 9 }
];

function openRadio() {
    if (radio_channel_on == 0) {
        radio_channel_on = 1;
    } else {
        selectRadioChannel(default_radio_chan);
        radioChannelsApp('Activate');
        return;
    }

    removeChannels();

    // Create JAPIT object for radio channels with entertainment-style layout
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 17;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ChannelList";
    JAPITObjForWIXPSvc.CommandDetails = {
        "AddChannels": [],
        "DisplaySettings": {
            "Layout": {
                "Type": "Entertainment",
                "GridSettings": {
                    "Columns": 3,
                    "Rows": 3,
                    "ItemWidth": 300,
                    "ItemHeight": 200,
                    "HorizontalSpacing": 40,
                    "VerticalSpacing": 40,
                    "Padding": 40
                },
                "Style": {
                    "Background": "white",
                    "ItemBackground": "white",
                    "ItemBorderRadius": 12,
                    "ItemShadow": "0 4px 6px rgba(0,0,0,0.05)",
                    "FontSize": 24,
                    "IconSize": 80
                }
            }
        }
    };

    // Add channels in entertainment-style layout
    radio_channel_list.forEach(channel => {
        const chan = {
            "BasicChannelDetails": {
                "ChannelNo": channel.number,
                "ChannelName": channel.name,
                "ChannelType": "IP",
                "DisplayStyle": "Entertainment"
            },
            "ChannelTuningDetails": {
                "URL": "multicast://" + channel.ip + "/0/0/0"
            },
            "ChannelDisplayDetails": {
                "Logo": channel.logo,
                "LogoSize": 80,
                "TextSize": 24,
                "BackgroundColor": "white",
                "HoverEffect": {
                    "Scale": 1.05,
                    "Background": "linear-gradient(135deg, #00b0f0, #0098d6)",
                    "TextColor": "white",
                    "Shadow": "0 8px 15px rgba(0,0,0,0.1)"
                }
            }
        };
        JAPITObjForWIXPSvc.CommandDetails.AddChannels.push(chan);
    });

    // Send channels to TV
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;

    // Apply entertainment-style layout
    var layoutConfig = new CreateJAPITObjectForWIXPSvc();
    layoutConfig.Cookie = 20;
    layoutConfig.CmdType = "Change";
    layoutConfig.Fun = "ApplicationControl";
    layoutConfig.CommandDetails = {
        "ApplicationDetails": {
            "ApplicationName": "RadioChannels",
            "ApplicationType": "Native",
            "ApplicationSubState": "RadioChannelAV",
            "DisplaySettings": {
                "ViewStyle": "Entertainment",
                "Layout": {
                    "Width": "100%",
                    "Height": "100%",
                    "Margin": "auto",
                    "MaxWidth": 1200
                },
                "Animation": {
                    "Type": "Fade",
                    "Duration": 300
                }
            }
        },
        "ApplicationState": "Activate"
    };
    sendWIxPCommand(layoutConfig);
    delete layoutConfig;

    // Select default channel
    selectRadioChannel(default_radio_chan);
}

// Function to select a specific radio channel
function selectRadioChannel(channelNumber) {
    console.log('Selecting channel:', channelNumber); // Debug log
    
    const channel = radio_channel_list.find(ch => ch.number === channelNumber);
    if (!channel) {
        console.error('Channel not found for selection:', channelNumber);
        return;
    }

    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 18;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ChannelSelection";
    JAPITObjForWIXPSvc.CommandDetails = {
        "TuneToChannel": {
            "ChannelNumber": channel.number,
            "URL": "multicast://" + channel.ip + "/0/0/0",
            "ChannelType": "IP"
        }
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Function to control radio application
function radioChannelsApp(state) {
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 19;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ApplicationControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "ApplicationDetails": {
            "ApplicationName": "RadioChannels",
            "ApplicationType": "Native",
            "ApplicationSubState": "RadioChannelAV",
            "ViewStyle": "Entertainment",
            "DisplaySettings": {
                "Layout": "Entertainment",
                "ItemSize": {
                    "Width": 300,
                    "Height": 200
                },
                "Spacing": 40,
                "Animation": true
            }
        },
        "ApplicationState": state
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Function to handle radio channel errors
function handleRadioError() {
    radio_channel_on = 0;
    
    // Show error toast
    const errorToast = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div class="toast" role="alert">
                <div class="toast-header bg-danger text-white">
                    <strong class="me-auto">Error</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Unable to setup radio channels. Please try again.
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', errorToast);
    const toast = new bootstrap.Toast(document.querySelector('.toast'));
    toast.show();
}

// Function to handle radio channel click
function handleRadioChannelClick(channelNumber) {
    console.log('Clicked channel number:', channelNumber); // Debug log
    
    // Find the channel in our list
    const channel = radio_channel_list.find(ch => ch.number === channelNumber);
    if (!channel) {
        console.error('Channel not found:', channelNumber);
        return;
    }
    
    console.log('Found channel:', channel); // Debug log

    // Create JAPIT object for channel tuning
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 18;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "ChannelSelection";
    JAPITObjForWIXPSvc.CommandDetails = {
        "TuneToChannel": {
            "ChannelNumber": channel.number,
            "URL": "multicast://" + channel.ip + "/0/0/0",
            "ChannelType": "IP"
        }
    };

    // Send tune command to TV
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;

    // Activate radio application
    radioChannelsApp('Activate');

    // Update UI to show active channel
    document.querySelectorAll('.radio-card').forEach(card => {
        card.classList.remove('active');
    });
    const activeCard = document.querySelector(`.radio-card[onclick*="${channelNumber}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
}

// Function to read radio channels from Excel
function loadRadioChannels() {
    const filePath = 'radiochannels.xlsx';
    
    fetch(filePath)
        .then(response => {
            console.log('Excel file fetch response:', response); // Debug log
            return response.arrayBuffer();
        })
        .then(buffer => {
            const data = new Uint8Array(buffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            
            console.log('Excel data loaded:', jsonData); // Debug log

            // Update radio_channel_list with Excel data
            radio_channel_list = jsonData.map((row, index) => {
                const channel = {
                    number: row.Chan_No,
                    name: row.Chan_name,
                    ip: row.Chan_IP,
                    logo: `logos/${row.Chan_name.replace(/\s+/g, '_')}.png`,
                    position: index + 1
                };
                console.log('Mapped channel:', channel); // Debug log
                return channel;
            });

            // Initialize radio channels after loading data
            initializeRadioChannels();
        })
        .catch(error => {
            console.error('Error loading radio channels:', error);
            handleRadioError();
        });
}

// Function to initialize radio channels
function initializeRadioChannels() {
    if (radio_channel_on === 0) {
        openRadio();
    }
}

// Call loadRadioChannels when the page loads
document.addEventListener('DOMContentLoaded', loadRadioChannels);

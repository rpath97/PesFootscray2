// Convert excel with radio channel details to json format, then extracts information about each channels
// Then creates JAPIT objects for each radio channel and sends it to the tv
// Author: Hanson Wilson
// Date: 03/10/2024


var default_chan_no = 200;
var channel_list = [];
var radio_channel_on = 0;
var radio_channel_list = [];
var radio_channel_playing = 0;



function openRadio() {
    const directoryPath = 'logos/channel_logos/'; // 
    const targetFilename = 'sbs popasia.png'; // Replace with the filename you're looking for

    //setting current page
    // const currentPage = document.querySelector('.current-page');
    // currentPage.textContent = 'Radio';
    previous_page = current_page;
    current_page = "radio_view";


    document.getElementById(previous_page).style.display = "none";
    document.getElementById(current_page).style.display = "block";
    

    //debugger;
    // window.onload = function() {
    //     const radioList = document.getElementsByClassName("radio_list");
    //     if (radioList.length > 0) { // Check if elements exist
    //       radioList[0].style.visibility = "visible"; // Access the first element
    //     } else {
    //       console.error("Element with class 'radio_list' not found");
    //     }
    //   };
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
        // Extracting excel data and converting it to json formta
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

                        console.log("Channel: " + chan);

                        // Pushing channel object to JAPIT channel object           
                        JAPITObjForWIXPSvc.CommandDetails.AddChannels.push(chan);
                        if (radio_channel_on == 1){
                            channel_list.push(chan);
                        }
                        
                    }
                    //Sending final list of channels to the tv
                    console.log("Radio Channel: " + JSON.stringify(JAPITObjForWIXPSvc));
                    sendWIxPCommand(JAPITObjForWIXPSvc);
                    delete JAPITObjForWIXPSvc;
                    // console.log("Channel List: " + channel_list);
                    
                    
                    //Ensuring that the default chanenl number is one from the list added
                    default_chan_no = channelNo_arr[Math.floor(jsonData.length/2)];

                    //Creating Hiding home dashbaord view and show radio view
                    document.querySelector(".entertainment-view").style.display = "none";
                    //document.getElementById("patientMenu").style.display = "none";
                    //document.getElementById("gallery").style.display = "none";
                    //document.getElementById("left-column").style.display = "flex";

                   // const leftColumn = document.getElementById("left-column");
                    
                    //const gifTitle = document.getElementById("gif-title");
                    const radioView = document.querySelector(".radio-view");
                    
                    channel_list.forEach(button => {
                        const btnElement = document.createElement('button');
                        btnElement.className = 'radio_chan_btn japit-button';
                        btnElement.id = button.BasicChannelDetails.ChannelName;
                        btnElement.setAttribute('data-channel-number', button.BasicChannelDetails.ChannelNo);
                        btnElement.setAttribute('data-japit-control', 'true');
                        btnElement.setAttribute('data-japit-focusable', 'true');

                        // Create image element
                        const image = document.createElement("img");
                        const logoMap = {
                            'ABC Classic': 'ABC_Classic.png',
                            'ABC Country': 'ABC_Country.png',
                            'ABC KIDS Listen': 'ABC_KIDS_Listen.png',
                            'ABC Jazz': 'ABC_Jazz.png',
                            'ABC Melbourne': 'ABC_Melbourne.png',
                            'ABC NewsRadio': 'ABC_News.png',
                            'ABC RN': 'ABC_RN.png',
                            'Double J': 'Double_J.png',
                            'triple j': 'triple_j.png',
                            'triple j Unearthed': 'triple_j_Unearthed.png'
                        };

                        const logoName = logoMap[button.BasicChannelDetails.ChannelName] || 'radio.png';
                        image.src = `logos/channel_logos/${logoName}`;
                        image.onerror = () => image.src = 'logos/radio.png';
                        btnElement.appendChild(image);

                        // Create text element
                        const textSpan = document.createElement("span");
                        textSpan.className = "buttonText";
                        textSpan.textContent = button.BasicChannelDetails.ChannelName;
                        btnElement.appendChild(textSpan);

                        // Add click handler
                        btnElement.addEventListener('click', radio_ui);

                        // Add to grid
                        radioView.appendChild(btnElement);
                    });
                    
                    document.getElementById(channel_list[0].BasicChannelDetails.ChannelName).focus();
                    //mute("Off");
                    document.querySelector(".radio-view").style.display = "flex";
                    console.log("Channel List: " + channel_list);
                })
            .catch(error => { //if the file coudl not be read
                
                document.getElementById("logmsgcallback").value += '\n' + 'file could not be read' + '\n';
                document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
            });

    } 
    else {
        //Creating Hiding home dashbaord view and show radio view
		radio_channel_on = 1;
        document.querySelector(".entertainment-view").style.display = "flex";
        // document.getElementById("patientMenu").style.display = "none";
        // document.getElementById("gallery").style.display = "none";
        // document.getElementById("radio_list").style.display = "flex";
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


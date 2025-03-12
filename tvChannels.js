// Convert excel with channel details to json format, then extracts information about each channels
// Then creates JAPIT objects for each channel and sends it to the tv
// Author: Hanson Wilson
// Date: 03/10/2024


var default_chan_no = 90;
var channel_list = [];
var tv_channel_on = 0;

function openTV() {
    current_page = 'tv_view';
    //Ensuring multiple clicks of the button consecutively doesn't keep on removing and adding channels
    if (tv_channel_on == 0){
        tv_channel_on = 1;
    } else {
        channelSelection(default_chan_no);
        tvChannelsApp('Activate');
        return;
    }

    mute("Off"); //turns audio on channels off when coming back to the dashboard
    // Removing all previous channels, so that no radio channels will pop up
    removeChannels();

    // Arrays that will hold the values from the json data extracted from excel
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
    const filePath = 'tvchannels.xlsx';
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            const data = new Uint8Array(buffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // looping through the different channel data and creating JAPIT objects
            for (let i = 0; i < jsonData.length; i++) {
                channelNo_arr[i] = jsonData[i].Chan_No;
                channelName_arr[i] = jsonData[i].Chan_name;
                channelIP_arr[i] = jsonData[i].Chan_IP;

                // Creating channel object
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
            }

            // Sending final list of channels to the TV
            console.log("TV Channel: " + JSON.stringify(JAPITObjForWIXPSvc));
            sendWIxPCommand(JAPITObjForWIXPSvc);
            delete JAPITObjForWIXPSvc;

            // Set default channel and activate TV app
            default_chan_no = channelNo_arr[Math.floor(jsonData.length/2)];
            channelSelection(default_chan_no);
            tvChannelsApp('Activate');
        })
        .catch(error => {
            document.getElementById("logmsgcallback").value += '\n' + 'file could not be read' + '\n';
            document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
        });
}


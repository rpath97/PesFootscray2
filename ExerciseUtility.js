/* 
*
* This File contains some Utility Functions.
* This can be reused in as is or even modified freely.
*
*/

/* a function to refresh the page */

function UtilityInit(){
	document.getElementById('logmsgcallback').style.fontSize = "10px";
	document.getElementById('logmsg').style.fontSize = "10px";

	document.getElementById('logmsgcallback').style.color = "green";
	document.getElementById('logmsg').style.color = "blue";

	// Initialize log windows as hidden
	// document.getElementById('IDJAPITFromTV').style.display = "none";
	// document.getElementById('IDJAPITToTV_Misc').style.display = "none";
	// document.getElementById('logmsgcallback').style.display = "none";
	// document.getElementById('logmsg').style.display = "none";

	//UtilityToggleLogsWindow();
	// setTimeout(function() {
	// 	try {
	// 		document.addEventListener("keydown", keyDownHandler, true);
	// 		document.addEventListener("OnKeyReceived", OnKeyReceivedHandler, false);
	// 	} catch(e) {
	// 		document.getElementById("logmsgcallback").value += '\n' + 'Add event listener not initialized: ' + '\n';
	// 	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
	// 	}
	// }, 5000);
}

function UtilityRefreshPage(){
	window.location.reload(true);
}

/* a function to showLogs the page */
function UtilityToggleLogsWindow(){
	if(document.getElementById('logmsgcallback').style.display == "none")
	{
		
		document.getElementById('IDJAPITFromTV').style.display = "flex";
		document.getElementById('IDJAPITToTV_Misc').style.display = "flex";
		document.getElementById('IdHeadingLogMsgCallback').style.display = "flex";
		document.getElementById('IdHeadingLogMsg').style.display = "flex";
		
		document.getElementById('logmsgcallback').style.display = "flex";
		document.getElementById('logmsg').style.display = "flex";
		
		document.getElementById('ButtonToggleLogs').innerHTML="Hide Logs";
		document.getElementById('ButtonToggleLogs').style.display="none";

	}
	else
	{
		document.getElementById('logmsgcallback').style.display = "none";
		document.getElementById('logmsg').style.display = "none";
		document.getElementById('IdHeadingLogMsgCallback').style.display = "none";
		document.getElementById('IdHeadingLogMsg').style.display = "none";
		
		document.getElementById('IDJAPITFromTV').style.display = "none";
		document.getElementById('IDJAPITToTV_Misc').style.display = "none";
		
		document.getElementById('ButtonToggleLogs').innerHTML="Show Logs";
		document.getElementById('ButtonToggleLogs').style.display="none";
	}
}

function UtilityClearLogsWindow()
{
	document.getElementById("logmsg").value = '';
	document.getElementById("logmsg").scrollTop=document.getElementById("logmsg").scrollHeight;
	
	document.getElementById("logmsgcallback").value = '';
	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
}

function PrintLogsWIXPToTV(Log)
{
	var FormattedJSON = JSON.stringify(Log, null, 4);
	
	document.getElementById("logmsg").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsg").scrollTop=document.getElementById("logmsg").scrollHeight;
}

function PrintLogsWIXPFromTV(Log)
{
	var FormattedJSON = JSON.stringify(Log, null, 4);
	
	document.getElementById("logmsgcallback").value += '\n' + FormattedJSON + '\n';
	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
}

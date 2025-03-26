

function apiGetCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // Replace with your API URL

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Successful response
            console.log('Response:', xhr.responseText);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            // Error handling
            console.log('Error:', xhr.status);
        }
    };

    // Send the GET request
    xhr.send();


    //method 2: only for testing, will not work on tv browser
    fetch('http://10.5.5.244/moduleData.php')
        .then(response => response.json())  // Assuming JSON is returned
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
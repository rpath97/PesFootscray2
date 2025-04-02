//open pdf function
window.openPdf = function (url) {
    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewers";
    document.getElementById(current_page).innerHTML = '';
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }

    document.getElementById("pdf-viewers").style.display = 'flex';

    PDFJS.workerSrc = "pdf.worker.js";
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    PDFJS.getDocument(url).then(function (pdf) {
        var numPages = pdf.numPages;  // Get the total number of pages
        for (var pageNum = 1; pageNum <= numPages; pageNum++) {
            renderPage(pdf, pageNum);
        }
    }).catch(function (error) {
        console.error("Error loading PDF:", error);
    });
    document.getElementById('pdf-viewers').focus();
}

function renderPage(pdf, pageNum) {
    pdf.getPage(pageNum).then(function (page) {
        var scale = 2;  // Adjust the zoom level of the page
        var viewport = page.getViewport(scale);

        var canvas = document.createElement('canvas');  // Create a new canvas for each page
        document.getElementById('pdf-viewers').appendChild(canvas);  // Append the canvas to the container

        var ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext);
    });
}




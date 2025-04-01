
//url: pdf file url
//canvas: html canvas block
async function renderPDF(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            //console.log("page num ", page)
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
    
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
    
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise; // Ensure rendering completes
    
            // Convert Canvas to Image
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            img.style.width = '100%'; // Fit within container
            container.appendChild(img);
            document.getElementById("logmsgcallback").value += '\n' + "Finished rendering pdf" + '\n';
            document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
        }
    } catch (err) {
        document.getElementById("logmsgcallback").value += '\n' + "Erro fetch pdf url" + err + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
    }
    
}
//non-canvas: html canvas block
async function renderPDF2(url, pdf_container_id) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            //console.log("page num ", page)
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
    
            // Create an OffscreenCanvas
            const offscreenCanvas = new OffscreenCanvas(viewport.width, viewport.height);
            const context = offscreenCanvas.getContext('2d');
            // canvas.width = viewport.width;
            // canvas.height = viewport.height;
    
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise; // Ensure rendering completes
    
           // Convert the OffscreenCanvas to an image (e.g., PNG)
            const imageBitmap = await offscreenCanvas.transferToImageBitmap();
            const blob = await offscreenCanvas.convertToBlob({ type: 'image/png' });
            const imageUrl = URL.createObjectURL(blob);

            // Display the image on the page
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100%';
            container.appendChild(img);


            document.getElementById("logmsgcallback").value += '\n' + "Finished rendering pdf" + '\n';
            document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
        }
    } catch (err) {
        document.getElementById("logmsgcallback").value += '\n' + "Erro fetch pdf url" + err + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;  
    }
    
}

//non-canvas: html canvas block
function renderPDF3(url, pdf_container_id) {
    //pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

    const container = document.getElementById(pdf_container_id);
    container.innerHTML = ''; // Clear previous content

    // var pdfjsLib = window['pdfjs-dist/build/pdf'];
    //PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.100/pdf.worker.min.js';
    PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.0.907/pdf.worker.js';

    try {
        PDFJS.getDocument(url).then(function (pdf) {
            console.log("PDF loaded, pages:", pdf.numPages);
    
            for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                (function (pageNum) { // Use IIFE to capture pageNum correctly
                    pdf.getPage(pageNum).then(function (page) {
                        var scale = 1.5;
                        var viewport = page.getViewport(scale);
    
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
    
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
    
                        page.render(renderContext).then(function () {
                            var img = document.createElement('img');
                            img.src = canvas.toDataURL('image/png');
                            img.style.width = '100%';
                            container.appendChild(img);
                        });
                    });
                })(pageNum);
            }
        }).catch(function (error) {
            console.error("Error loading PDF:", error);
        });
    } catch (err) {
        console.log(err)
        document.getElementById("logmsgcallback").value += '\n' + "Erro fetch pdf url" + err + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;
    }
    
    
}

function pdfViewer(url) {
    pdfjsLib.getDocument(url).then(function(pdf) {
        pdf.getPage(1).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);

            var canvas = document.getElementById('pdf-render');
            var ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            page.render(renderContext);
        });
    }).catch(function(error) {
        console.error("Error loading PDF:", error);
    });
}



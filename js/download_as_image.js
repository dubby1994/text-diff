function downloadImage() {
    const mode = window.currentMode || 'text';

    if (mode === 'image') {
        const canvasA = document.getElementById('canvasA');
        const canvasB = document.getElementById('canvasB');
        const canvasDiff = document.getElementById('canvasDiff');

        if (!canvasA.width || !canvasB.width) {
            alert('No image comparison to export.');
            return;
        }

        const totalWidth = canvasA.width + canvasB.width + canvasDiff.width;
        const maxHeight = Math.max(canvasA.height, canvasB.height, canvasDiff.height);
        const combinedCanvas = document.createElement('canvas');
        combinedCanvas.width = totalWidth;
        combinedCanvas.height = maxHeight;
        const ctx = combinedCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalWidth, maxHeight);
        ctx.drawImage(canvasA, 0, 0);
        ctx.drawImage(canvasB, canvasA.width, 0);
        ctx.drawImage(canvasDiff, canvasA.width + canvasB.width, 0);

        const link = document.createElement('a');
        link.download = "image-compare-result.png";
        link.href = combinedCanvas.toDataURL("image/png");
        link.click();
        return;
    }

    const baseText = document.getElementById("baseText").value;
    const newText = document.getElementById("newText").value;
    const resultHtml = document.getElementById("outputdiv").innerHTML;

    const hasContent = (baseText || newText || resultHtml.trim());
    if (!hasContent) {
        alert("No content to export.");
        return;
    }

    document.getElementById("exportBase").innerText = baseText;
    document.getElementById("exportNew").innerText = newText;
    document.getElementById("exportResult").innerHTML = resultHtml;
    document.getElementById("exportTime").innerText = new Date().toLocaleString();

    const wrapper = document.getElementById("exportWrapper");

    html2canvas(wrapper, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = "text-compare-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
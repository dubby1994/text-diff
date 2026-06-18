function downloadImage() {
    const mode = window.currentMode || 'text';

    if (mode === 'image') {
        const canvases = getImageCanvases();
        if (!canvases) return;
        const { canvasA, canvasB, canvasDiff } = canvases;

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

    if (!populateExportWrapper()) return;

    const wrapper = document.getElementById("exportWrapper");
    const savedStyle = wrapper.style.cssText;
    wrapper.style.cssText = "";

    html2canvas(wrapper, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true
    }).then(canvas => {
        wrapper.style.cssText = savedStyle;
        const link = document.createElement('a');
        link.download = "text-compare-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        wrapper.style.cssText = savedStyle;
    });
}

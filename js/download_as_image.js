function downloadImage() {
    const baseText = document.getElementById("baseText").value;
    const newText = document.getElementById("newText").value;
    const resultHtml = document.getElementById("outputdiv").innerHTML;

    if (!baseText && !newText) {
        alert("No content to export.");
        return;
    }

    // 填充导出内容
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
        const link = document.createElement("a");
        link.download = "text-compare-result.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

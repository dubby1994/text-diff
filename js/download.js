const exportStyle = `
<style>
body {
    margin: 0;
    padding: 24px;
    background: #f3f4f6;
    font-family: Consolas, Monaco, monospace;
}
#exportWrapper {
    max-width: 1200px;
    margin: auto;
    background: #ffffff;
    padding: 24px;
}
pre {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 12px;
    white-space: pre-wrap;
}
.added {
    background: #dcfce7;
    color: #166534;
}
.removed {
    background: #fee2e2;
    color: #991b1b;
    text-decoration: line-through;
}
</style>
`;

function downloadHTML() {
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

    // 生成完整 HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Text Compare Result</title>
${exportStyle}
</head>
<body>
${document.getElementById("exportWrapper").outerHTML.replace('style="position: fixed; left: -9999px; top: 0; width: 1200px; background: #fff; padding: 24px; font-family: Consolas, Monaco, monospace;"', '')}
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], {type: "text/html;charset=utf-8"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text-compare-result.html";
    link.click();
    URL.revokeObjectURL(link.href);
}
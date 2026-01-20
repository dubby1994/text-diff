function downloadResult() {
    const resultHtml = document.getElementById("outputdiv").innerHTML;

    if (!resultHtml.trim()) {
        alert("No comparison result to download.");
        return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Text Compare Result</title>
    <style>
        body {
            font-family: Consolas, Monaco, monospace;
            background: #f9fafb;
            padding: 20px;
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
        .result {
            white-space: pre-wrap;
            line-height: 1.7;
            font-size: 15px;
        }
    </style>
</head>
<body>
    <h2>Text Compare Result</h2>
    <div class="result">
        ${resultHtml}
    </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], {type: "text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "text-compare-result.html";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
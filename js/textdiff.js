// https://github.com/liddiard/text-diff?tab=readme-ov-file
// https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs#line-mode
function diffUsingJS() {
    const dmp = new diff_match_patch();

    var text1 = document.getElementById('baseText').value;
    var text2 = document.getElementById('newText').value;

    var d = dmp.diff_main(text1, text2);

    dmp.diff_cleanupSemantic(d);

    var ds = dmp.diff_prettyHtml(d);
    document.getElementById('outputdiv').innerHTML = ds
}



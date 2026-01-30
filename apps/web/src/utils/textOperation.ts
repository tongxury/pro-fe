export const copyToClipboard = (text?: string) => {
    navigator.clipboard
        .writeText(text ?? "")
        .then(function () {
            console.log("文本已复制！");
        })
        .catch(function (err) {
            console.error("复制失败！", err);
        });
};

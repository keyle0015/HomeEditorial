insertShared();

function insertShared() {
    $(function () {
        $("#headerArea").load("/shared/nav.html");
        $("#footer").load("/shared/footer.html");
        $.get('/shared/head.html', function (response) {
            $('head').append(response);
        });
    });
    console.log("BOO")
}
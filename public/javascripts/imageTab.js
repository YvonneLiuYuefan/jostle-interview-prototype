function setActivePage(id) {
    var previousActivePage = window.previousActivePage;
    previousActivePage.removeClass("active");
    var liObject = $(id).closest("li");
    liObject.addClass("active");
    window.previousActivePage = liObject;
}
function setPageIndex(){
    $('#left').html(window.middlePage - 1);
    $('#left').data('pagenumber', window.middlePage - 1);
    $('#middle').html(window.middlePage);
    $('#middle').data('pagenumber', window.middlePage);
    $('#right').html(window.middlePage + 1);
    $('#right').data('pagenumber', window.middlePage + 1);
}
function getMaxPage() {
    $.ajax({
        method: "POST",
        url: "/pageService"
    })
        .done(function (res) {
            window.maxPage = res.maxPage;
        });
}
function updateButtonState() {
    var previousLi = $('li.page-item.previous');
    var firstLi = $('li.page-item.first');
    var nextLi = $('li.page-item.next');
    var lastLi = $('li.page-item.last');
    if (window.activePage == 1){
        if (!firstLi.hasClass('disabled')){
            firstLi.addClass('disabled');
        }
        if (!previousLi.hasClass('disabled')) {
            previousLi.addClass('disabled');
        }
        if (nextLi.hasClass('disabled')) {
            nextLi.removeClass('disabled');
        }
        if (lastLi.hasClass('disabled')) {
            lastLi.removeClass('disabled');
        }
    } else if (window.activePage == window.maxPage) {
        if (firstLi.hasClass('disabled')) {
            firstLi.removeClass('disabled');
        }
        if (previousLi.hasClass('disabled')) {
            previousLi.removeClass('disabled');
        }
        if (!nextLi.hasClass('disabled')) {
            nextLi.addClass('disabled');
        }
        if (!lastLi.hasClass('disabled')) {
            lastLi.addClass('disabled');
        }
    } else {
        if (firstLi.hasClass('disabled')) {
            firstLi.removeClass('disabled');
        }
        if (previousLi.hasClass('disabled')) {
            previousLi.removeClass('disabled');
        }
        if (nextLi.hasClass('disabled')) {
            nextLi.removeClass('disabled');
        }
        if (lastLi.hasClass('disabled')) {
            lastLi.removeClass('disabled');
        }
    }
}
function imagePage(src) {
    var pageNumber;
    if (src != null) {
        pageNumber = $(src).data('pagenumber');
        window.activePage = pageNumber;
        if (pageNumber == 1) {
            setActivePage('#left');
            window.middlePage = 2;
            setPageIndex();
        } else if (pageNumber == window.maxPage) {
            setActivePage('#right');
            window.middlePage = pageNumber - 1;
            setPageIndex();
        } else {
            setActivePage('#middle');
            window.middlePage = pageNumber;
            setPageIndex();
        }
    } else {
        pageNumber = 1;
    }
    updateButtonState();
    $.ajax({
        method: "POST",
        url: "/imageService",
        data: {
            "pageNumber": pageNumber
        }
    })
        .done(function (res) {
            $('#imageContainer').html("");
            for (var i = 0; i < res.length; i++) {
                var img = $('<img />', {
                    class: 'img-responsive img-margin',
                    src: res[i].url,
                    alt: res[i].id,
                    'data-toggle': "modal",
                    'data-target': "#imageInfoModal",
                    'data-title' : res[i].title,
                    'data-thumbnailurl' : res[i].thumbnailUrl,
                    'data-position': i+1
                });
                img.appendTo($('#imageContainer'));
                var span = $('<div />', {
                    class: 'img-description'
                }).html(res[i].title);
                $('#imageContainer').append(span);
            }


        });
}
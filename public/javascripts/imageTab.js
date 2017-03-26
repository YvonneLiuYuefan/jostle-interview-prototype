/**
 * helper function
 * add active class to current pagination button, so that it appears as being selected
 * @param id
 */
function setActivePaginationButton(id) {
    var previousActivePage = window.previousActivePage;
    previousActivePage.removeClass("active");
    var liObject = $(id).closest("li");
    liObject.addClass("active");
    window.previousActivePage = liObject;
}
/**
 * helper function
 * update page index on pagination buttons, so that when the button is clicked,
 * the right page number is sent to be back end
 */
function setPageIndex(){
    $('#left').html(window.middlePage - 1);
    $('#left').data('pagenumber', window.middlePage - 1);
    $('#middle').html(window.middlePage);
    $('#middle').data('pagenumber', window.middlePage);
    $('#right').html(window.middlePage + 1);
    $('#right').data('pagenumber', window.middlePage + 1);
}
/**
 * get the total number of pages of given image data,
 * so that pagination nav know the max page number
 */
function getMaxPage() {
    $.ajax({
        method: "POST",
        url: "/pageService"
    })
    .done(function (res) {
        window.maxPage = res.maxPage;
    });
}
/**
 * helper function
 * enable/disable certain pagination buttons depending on the current active page
 */
function updateButtonState() {
    if (window.activePage == undefined){
        return
    }
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
/**
 * update list of images based on the active pagination button
 * @param src
 */
function updateImageGallery(src) {
    var pageNumber;
    if (src != null) {
        pageNumber = $(src).data('pagenumber');
        window.activePage = pageNumber;
        if (pageNumber == 1) {
            setActivePaginationButton('#left');
            window.middlePage = 2;
            setPageIndex();
        } else if (pageNumber == window.maxPage) {
            setActivePaginationButton('#right');
            window.middlePage = pageNumber - 1;
            setPageIndex();
        } else {
            setActivePaginationButton('#middle');
            window.middlePage = pageNumber;
            setPageIndex();
        }
    } else {
        pageNumber = 1;
    }
    updateButtonState();
    // send current page to server
    // server will return the 10 images based on the page number
    $.ajax({
        method: "POST",
        url: "/imageService",
        data: {
            "pageNumber": pageNumber
        }
    })
    .done(function (res) {
        // once we get the image array, construct 10 image elements and description div elements
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
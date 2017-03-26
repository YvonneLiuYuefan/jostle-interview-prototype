jQuery(document).ready(function ($) {
    // initialize various scenes
    $('#tabs').tab(); // initialize tabs, so that users can switch between them; bootstrap function

    // the following block of code is to be used by the image tab
    updateImageGallery(null); // load first 10 images
    getMaxPage(); // get max page number
    // the following three variables help keep track of pagination button states
    window.previousActivePage = $('li.page-item.active');
    window.middlePage = 2;
    window.activePage = 1;
    // imageIngoModal handler
    // Update the modal's content base on the image that was clicked
    $('#imageInfoModal').on('show.bs.modal', function (event) {
        var img = $(event.relatedTarget); // Img that triggered the modal
        var title = img.data('title');
        var thumbnailUrl = img.data('thumbnailurl');
        var position = img.data('position');
        var modal = $(this);
        modal.find('#span1').html(' ' + title);
        modal.find('#thumbnail').attr('src', thumbnailUrl);
        modal.find('#span2').html(' This is the '+ position + '/10 image on page ' + window.activePage);
    });
    // the following 4 handlers update pagination state and image gallery when pagination buttons are clicked
    $('li.page-item.next').on('click',function(event){
        if (window.activePage == 1) {
            setActivePaginationButton("#middle");
            window.activePage++;
            updateImageGallery($('#middle'));
        } else if (window.activePage == window.maxPage - 1 ) {
            setActivePaginationButton("#right");
            window.activePage++;
            updateImageGallery($('#right'));
        } else {
            window.activePage++;
            window.middlePage++;
            setPageIndex();
            updateImageGallery($('#middle'));
        }
    });
    $('li.page-item.previous').on('click', function (event) {
        if (window.activePage == window.maxPage) {
            setActivePaginationButton("#middle");
            window.activePage--;
            updateImageGallery($('#middle'));
        } else if (window.activePage == 2) {
            setActivePaginationButton("#left");
            window.activePage--;
            updateImageGallery($('#left'));
        } else {
            window.activePage--;
            window.middlePage--;
            setPageIndex();
            updateImageGallery($('#middle'));
        }
    });
    $('li.page-item.last').on('click', function(event){
        setActivePaginationButton("#right");
        window.activePage = window.maxPage;
        window.middlePage = window.maxPage - 1;
        setPageIndex();
        updateImageGallery($('#right'));
    });
    $('li.page-item.first').on('click', function (event) {
        setActivePaginationButton("#left");
        window.activePage = 1;
        window.middlePage = 2;
        setPageIndex();
        updateImageGallery($('#left'));
    });

    // the following block of code is to be used by the other tab
    $('#inputTime').keyup(updateRotationTime);
    $('#inputTime').change(updateRotationTime);
    $('#inputDegree').keyup(updateRotationDegree);
    $('#inputDegree').change(updateRotationDegree);
});



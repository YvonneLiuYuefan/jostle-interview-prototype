jQuery(document).ready(function ($) {
    $('#tabs').tab();
    updateImageGallery(null);
    getMaxPage();
    window.previousActivePage = $('li.page-item.active');
    window.middlePage = 2;
    window.activePage = 1;
    $('#inputTime').keyup(updateRotationTime);
    $('#inputTime').change(updateRotationTime);
    $('#inputDegree').keyup(updateRotationDegree);
    $('#inputDegree').change(updateRotationDegree);
    $('#imageInfoModal').on('show.bs.modal', function (event) {
        var img = $(event.relatedTarget); // Img that triggered the modal
        var title = img.data('title');
        var thumbnailUrl = img.data('thumbnailurl');
        var position = img.data('position');
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-title').text('Image ' + position + '/10');
        modal.find('#span1').html(title);
        modal.find('#span2').html(thumbnailUrl);
    });
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
});



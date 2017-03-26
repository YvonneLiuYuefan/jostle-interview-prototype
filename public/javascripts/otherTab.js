/**
 * change the animation rule by changing rotation degree
 */
function updateRotationDegree() {
    var inputVal = $('#inputDegree').val();
    if (inputVal < 0 || inputVal > 720) {
        $('#rotationModal .modal-body > #input-span').html(inputVal + ' degree ')
        $('#rotationModal .modal-body > #message-span').html('Angle should be in the range 0~720 degrees.');
        $('#rotationModal').modal();
        $('#inputDegree').val("360")
    } else {
        $('#rotationImg').mouseover(function() {
            $(this).css('-webkit-transform', 'rotate(' + inputVal + 'deg)');
            $(this).css('transform', 'rotate(' + inputVal + 'deg)');
        });
        $('#rotationImg').mouseout(function () {
            $(this).css('-webkit-transform', 'rotate(0deg)');
            $(this).css('transform', 'rotate(0deg)');
        });
    }
}
/**
 * change the animation rule by changing rotation time
 */
function updateRotationTime() {
    var inputVal = $('#inputTime').val();
    if (inputVal < 0 || inputVal > 5) {
        $('#rotationModal .modal-body > #input-span').html(inputVal + 's ')
        $('#rotationModal .modal-body > #message-span').html('Time should be in the range 0~5s.');
        $('#rotationModal').modal();
        $('#inputTime').val("1")
    } else {
        $('#rotationImg').css('-webkit-transition', '-webkit-transform ' + inputVal + 's ease-in-out');
        $('#rotationImg').css('transition', 'transform ' + inputVal + 's ease-in-out');
    }
}

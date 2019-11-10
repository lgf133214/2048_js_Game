function showNumWithAnimation(x, y, randomNum) {
    let numberCell = $("#num-cell-" + x + '-' + y);
    numberCell.css('background-color', getNumberBackgroundColor(randomNum));
    numberCell.css('color', getNumberColor(randomNum));
    numberCell.text(randomNum);
    $('.game-container .num-cell').css({
        'line-height': cellWidth + 'px',
        'font-size': cellWidth * 0.5,
    });

    numberCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getTopPosition(x),
        left: getLeftPosition(y),
    }, 200);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    let numberCell = $("#num-cell-" + fromx + '-' + fromy);
    $('.game-container .num-cell').css({
        'line-height': cellWidth + 'px',
        'font-size': cellWidth * 0.5,
    });
    numberCell.animate({
        top: getTopPosition(tox),
        left: getLeftPosition(toy)
    }, 200);
}
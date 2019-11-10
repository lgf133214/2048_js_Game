let nums = new Array();
let hasConflicted = new Array();
let score = 0;
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;


$().ready(function () {
    $(".new-game").click(function () {
        newGame();
    });
    newGame();
});

function newGame() {
    if (containerWidth > 500) {
        containerWidth = 500;
        cellWidth = 100;
        cellSpace = 20;
    } else {
        settingForMobile();
    }
    init();

    generateOneNumber();
    generateOneNumber();

}

function settingForMobile() {
    $('body').css('width', containerWidth);
    $(".game-container").css({
        'width': containerWidth,
        'height': containerWidth,

    });
    $('.game-container .grid-cell').css({
        'width': cellWidth,
        'height': cellWidth,
    });
}

function init() {
    // 位置初始化
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let gridCell = $("#grid-cell-" + i + '-' + j);
            gridCell.css('top', getTopPosition(i));
            gridCell.css('left', getLeftPosition(j));
        }
    }

    // 初始化数组
    for (let i = 0; i < 4; i++) {
        nums[i] = new Array();
        hasConflicted[i] = new Array();
        for (let j = 0; j < 4; j++) {
            nums[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateView();
    score = 0;
    updateScore(score);

    $('.game-container .num-cell').css({
        'line-height': cellWidth + 'px',
        'font-size': cellWidth * 0.5,
    });
}

function updateView() {
    $(".num-cell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $(".game-container").append('<div class="num-cell" id="num-cell-' + i + '-' + j + '"></div>');
            let numCell = $('#num-cell-' + i + '-' + j);
            if (nums[i][j] === 0) {
                numCell.css('width', '0px');
                numCell.css('height', '0px');
                numCell.css('top', getTopPosition(i) + cellWidth * 0.5);
                numCell.css('left', getLeftPosition(j) + cellWidth * 0.5);
            } else {
                numCell.css('top', getTopPosition(i));
                numCell.css('left', getLeftPosition(j));
                numCell.css('width', cellWidth);
                numCell.css('height', cellWidth);
                numCell.css('background-color', getNumberBackgroundColor(nums[i][j]));
                numCell.css('color', getNumberColor(nums[i][j]));
                numCell.text(nums[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.game-container .num-cell').css({
        'line-height': cellWidth + 'px',
        'font-size': cellWidth * 0.5,
    });


}

function generateOneNumber() {
    if (noSpace(nums)) {
        return false;
    } else {
        let count = 0;
        let temp = new Array();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (nums[i][j] === 0) {
                    temp[count] = 4 * i + j;
                    count++;
                }
            }
        }
        let pos = Math.floor(Math.random() * count);
        let randx = Math.floor(temp[pos] / 4);
        let randy = temp[pos] % 4;

        let randomNum = Math.random() > 0.5 ? 2 : 4;

        nums[randx][randy] = randomNum;

        showNumWithAnimation(randx, randy, randomNum);
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:// left
            if (canMoveLeft(nums)) {
                moveLeft();
                setTimeout(generateOneNumber, 200);
                setTimeout(isGameOver, 500);
            }
            return false;
        case 38:// up
            if (canMoveUp(nums)) {
                moveUp();
                setTimeout(generateOneNumber, 200);
                setTimeout(isGameOver, 500);
            }
            return false;
        case 39://right
            if (canMoveRight(nums)) {
                moveRight();
                setTimeout(generateOneNumber, 200);
                setTimeout(isGameOver, 500);
            }
            return false;
        case 40:// down
            if (canMoveDown(nums)) {
                moveDown();
                setTimeout(generateOneNumber, 200);
                setTimeout(isGameOver, 500);
            }
            return false;
        default:
            break;
    }
});
$().ready(function () {

    $(".game-container").on('touchstart', function (event) {
        event.preventDefault();
        event = event.originalEvent.changedTouches[0];
        startX = event.pageX;
        startY = event.pageY;
    });

    $(".game-container").on('touchend', function (event) {
        event = event.originalEvent.changedTouches[0];
        endX = event.pageX;
        endY = event.pageY;
        let deltaX = endX - startX;
        let deltaY = endY - startY;
        if (Math.abs(deltaX) < cellSpace && Math.abs(deltaY) < cellSpace) {
            event.preventDefault();
        }
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            if (deltaX > 0) {
                // right
                if (canMoveRight(nums)) {
                    moveRight();
                    setTimeout(generateOneNumber, 200);
                    setTimeout(isGameOver, 500);
                }
            } else {
                // left
                if (canMoveLeft(nums)) {
                    moveLeft();
                    setTimeout(generateOneNumber, 200);
                    setTimeout(isGameOver, 500);
                }
            }
        } else {
            if (deltaY > 0) {
                // down
                if (canMoveDown(nums)) {
                    moveDown();
                    setTimeout(generateOneNumber, 200);
                    setTimeout(isGameOver, 500);
                }
            } else {
                // up
                if (canMoveUp(nums)) {
                    moveUp();
                    setTimeout(generateOneNumber, 200);
                    setTimeout(isGameOver, 500);
                }
            }
        }

    });
});

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (nums[i][j] !== 0) {
                for (let k = 0; k < j; k++) {
                    if (nums[i][k] === 0 && noBlockHorizontal(i, k, j, nums)) {
                        showMoveAnimation(i, j, i, k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        setTimeout(updateView, 200);
                        break;
                    } else if (nums[i][k] === nums[i][j] && noBlockHorizontal(i, k, j, nums) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        setTimeout(updateView, 200);
                        break;
                    }
                }
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (nums[i][j] !== 0) {
                for (let k = 3; k > j; k--) {
                    if (nums[i][k] === 0 && noBlockHorizontal(i, j, k, nums)) {
                        showMoveAnimation(i, j, i, k);
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[i][k] === nums[i][j] && noBlockHorizontal(i, j, k, nums) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}

function moveUp() {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (nums[i][j] !== 0) {
                for (let k = 0; k < i; k++) {
                    if (nums[k][j] === 0 && noBlockVertical(j, k, i, nums)) {
                        showMoveAnimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[k][j] === nums[i][j] && noBlockVertical(j, k, i, nums) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}

function moveDown() {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (nums[i][j] !== 0) {
                for (let k = 3; k > i; k--) {
                    if (nums[k][j] === 0 && noBlockVertical(j, i, k, nums)) {
                        showMoveAnimation(i, j, k, j);
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        break;
                    } else if (nums[k][j] === nums[i][j] && noBlockVertical(j, i, k, nums) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        score += nums[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(updateView, 200);
}


let documentWidth = document.documentElement.clientWidth;
let documentHeight = document.documentElement.clientHeight;
let containerWidth = Math.min(documentWidth, documentHeight);
containerWidth *= 0.92;
let cellWidth = containerWidth * 0.2;
let cellSpace = containerWidth * 0.04;


function getLeftPosition(i) {
    return cellSpace + (cellWidth + cellSpace) * i;
}

function getTopPosition(j) {
    return cellSpace + (cellWidth + cellSpace) * j;
}


//获取数字背景颜色
function getNumberBackgroundColor(num) {
    switch (num) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
}

//获取数字颜色
function getNumberColor(num) {
    if (num <= 4) {
        return '#776e65';
    } else {
        return '#fff';
    }
}


function noSpace(nums) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(nums) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (nums[i][j] !== 0) {
                if (nums[i][j - 1] === 0 || nums[i][j - 1] === nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(nums) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (nums[i][j] !== 0) {
                if (nums[i][j + 1] === 0 || nums[i][j + 1] === nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(nums) {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] !== 0) {
                if (nums[i - 1][j] === 0 || nums[i - 1][j] === nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(nums) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (nums[i][j] !== 0) {
                if (nums[i + 1][j] === 0 || nums[i + 1][j] === nums[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


function noBlockHorizontal(row, col1, col2, nums) {
    for (let i = col1 + 1; i < col2; i++) {
        if (nums[row][i] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, nums) {
    for (let i = row1 + 1; i < row2; i++) {
        if (nums[i][col] !== 0) {
            return false;
        }
    }
    return true;
}

function updateScore(score) {
    $("#score").text(score);
}

function noMove(nums) {
    return !(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums));
}

function isGameOver() {
    if (noSpace(nums) && noMove(nums)) {
        alert('Game Over!');
        newGame();
    }
}

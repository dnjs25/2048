var table = document.getElementById('table');
var data = [];
var score = document.getElementById('score'); 

function init(re) {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    var colData = [];
    data.push(colData);
    var tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(function () {
      colData.push(0);
      var td = document.createElement('td');
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
  console.log(fragment);
  if (re === true) {
    random();
    draw();
  }
}

function random() {
  var emptyArr = [];
  data.forEach(function (colData, i) {
    colData.forEach(function (rowData, j) {
      if (!rowData) {
        emptyArr.push([i, j]);
      }
    });
  });
  if (emptyArr.length === 0) {
    alert('게임오버: ' + score.textContent);
    table.innerHTML = '';
    data = [];
    init(true);
  } else {
    var randomS = emptyArr[Math.floor(Math.random() * emptyArr.length)];
    data[randomS[0]][randomS[1]] = 2;
    draw();
  }
}

function draw() {
  data.forEach(function (colData, i) {
    colData.forEach(function (rowData, j) {
      if (rowData > 0) {
        table.children[i].children[j].textContent = rowData;
      } else {
        table.children[i].children[j].textContent = '';
      }
    });
  });
}

init();
random();
draw();

var dragStart = false;
var darging = false;
var start;
var end;

window.addEventListener('mousedown', function (event) {
  dragStart = true;
  start = [event.clientX, event.clientY];
});

window.addEventListener('touchstart', function (event) {
  dragStart = true;
  start = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
});

window.addEventListener('mousemove', function (event) {
  if (dragStart) {
    darging = true;
  }
});

window.addEventListener('touchmove', function (event) {
  if (dragStart) {
    darging = true;
  }
  // console.log('touchmove');
  // alert('move');
});


window.addEventListener('mouseup', function (event) {
  end = [event.clientX, event.clientY];
  if (darging) {
    var direction;
    var x = end[0] - start[0];
    var y = end[1] - start[1];
    if (x < 0 && Math.abs(x) / Math.abs(y) > 1) {
      direction = 'left';
    } else if (x > 0 && Math.abs(x) / Math.abs(y) > 1) {
      direction = 'right';
    } else if (y > 0 && Math.abs(x) / Math.abs(y) < 1) {
      direction = 'bottom';
    } else if (y < 0 && Math.abs(x) / Math.abs(y) < 1) {
      direction = 'top';
    }
    console.log(x, y, direction);
  }

  dragStart = false;
  darging = false;

  switch(direction) {
    case 'left':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === rowData) {
              newData[i][newData[i].length - 1] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[i][newData[i].length - 1];
              console.log(score);
            } else {
              newData[i].push(rowData);
            }
          }
        });
      });
      // console.log(newData);
      [1, 2, 3, 4].forEach(function (colData, i) {
        [1, 2, 3, 4].forEach(function (rowData, j) {
          data[i][j] = newData[i][j] || 0;
          // console.log(data);
        });
      });
      break;
    case 'right':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[i][0] && newData[i][0] === rowData) {
              newData[i][0] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[i][0];
              console.log(score);
            } else {
              newData[i].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (colData, i) {
        [1, 2, 3, 4].forEach(function (rowData, j) {
          data[i][3 - j] = newData[i][j] || 0;
          console.log(data);
        });
      });
      break;
    case 'top':
      var newData = [ [],[],[],[] ];
      data.forEach(function(colData, i) {
        colData.forEach(function(rowData, j) {
          if (rowData) {
            console.log(i, j, JSON.parse(JSON.stringify(newData)), newData[j].length - 1);
            if (newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === rowData) {
              newData[j][newData[j].length - 1] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              score.textContent = presentScore + newData[j][newData[j].length - 1];
            } else {
              newData[j].push(rowData);
            }
          }
        });
      });
      // console.log(newData);

      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (colData, j) {
          data[j][i] = newData[i][j] || 0;
          // console.log(data);
        });
      });
      break;
    case 'bottom':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[j][0] && newData[j][0] === rowData) {
              newData[j][0] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[j][0];
              console.log(score);
            } else {
              newData[j].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (colData, j) {
          data[3 - j][i] = newData[i][j] || 0;
          console.log(data);
        });
      });
      break;
  }
  draw();
  random();
});

window.addEventListener('touchend', function (event) {
  end = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];
  if (darging) {
    var direction;
    var x = end[0] - start[0];
    var y = end[1] - start[1];
    if (x < 0 && Math.abs(x) / Math.abs(y) > 1) {
      direction = 'left';
    } else if (x > 0 && Math.abs(x) / Math.abs(y) > 1) {
      direction = 'right';
    } else if (y > 0 && Math.abs(x) / Math.abs(y) < 1) {
      direction = 'bottom';
    } else if (y < 0 && Math.abs(x) / Math.abs(y) < 1) {
      direction = 'top';
    }
    console.log(x, y, direction);
  }

  dragStart = false;
  darging = false;

  switch (direction) {
    case 'left':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === rowData) {
              newData[i][newData[i].length - 1] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[i][newData[i].length - 1];
              console.log(score);
            } else {
              newData[i].push(rowData);
            }
          }
        });
      });
      // console.log(newData);
      [1, 2, 3, 4].forEach(function (colData, i) {
        [1, 2, 3, 4].forEach(function (rowData, j) {
          data[i][j] = newData[i][j] || 0;
          // console.log(data);
        });
      });
      break;
    case 'right':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[i][0] && newData[i][0] === rowData) {
              newData[i][0] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[i][0];
              console.log(score);
            } else {
              newData[i].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (colData, i) {
        [1, 2, 3, 4].forEach(function (rowData, j) {
          data[i][3 - j] = newData[i][j] || 0;
          console.log(data);
        });
      });
      break;
    case 'top':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            console.log(i, j, JSON.parse(JSON.stringify(newData)), newData[j].length - 1);
            if (newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === rowData) {
              newData[j][newData[j].length - 1] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              score.textContent = presentScore + newData[j][newData[j].length - 1];
            } else {
              newData[j].push(rowData);
            }
          }
        });
      });
      // console.log(newData);

      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (colData, j) {
          data[j][i] = newData[i][j] || 0;
          // console.log(data);
        });
      });
      break;
    case 'bottom':
      var newData = [[], [], [], []];
      data.forEach(function (colData, i) {
        colData.forEach(function (rowData, j) {
          if (rowData) {
            if (newData[j][0] && newData[j][0] === rowData) {
              newData[j][0] *= 2;
              var presentScore = parseInt(score.textContent, 10);
              console.log(presentScore, score.textContent);
              score.textContent = presentScore + newData[j][0];
              console.log(score);
            } else {
              newData[j].unshift(rowData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach(function (rowData, i) {
        [1, 2, 3, 4].forEach(function (colData, j) {
          data[3 - j][i] = newData[i][j] || 0;
          console.log(data);
        });
      });
      break;
  }
  draw();
  random();
});
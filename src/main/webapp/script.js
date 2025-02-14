"use strict";
let x, y, r;
let svg = document.getElementById("svg");

function clearPoints() {
  const circles = svg.getElementsByTagName("circle");
  while (circles.length > 0) {
    circles[0].remove();
  }
}

function drawPoint(x, y, r, result) {
  //alert("x="+x+"y="+y+"r="+r)

  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x * 300 / r + 400);
  circle.setAttribute("cy", -y * 300 / r + 400);
  circle.setAttribute("r", 3);
  circle.style.fill = result ? "#09a53d" : "#a50909";
  svg.appendChild(circle);

  /*setTimeout(() => {
    svg.removeChild(circle);
  }, 5000);*/
}


function addToTable(x, y, r, result) {
  const table = document.getElementById("outputTable");

  const newRow = table.insertRow();
  newRow.insertCell().innerText = x;
  newRow.insertCell().innerText = y;
  newRow.insertCell().innerText = r;
  newRow.insertCell().innerHTML = result ? "<span class=\"success\">Y</span>": "<span class=\"fail\">N</span>";
}
async function checkPoint(x, y, r) {
  const url = "controller";
  const Data = new URLSearchParams();
  Data.append("X", x);
  Data.append("Y", y);
  Data.append("R", r);
  Data.append("action", "checkPoint")
  const response = await fetch(url, {method: "POST",    headers: {"Content-Type": "application/x-www-form-urlencoded"},body:Data.toString()});
  if (!response.ok) {
    createNotification("проблема с отправкой на сервер");
  }
  const data = await response.json();
  if (data.error) createNotification(data.error);

  return data;
}

async function sendCoordinatesToServer(x, y, r) {
  const data = await checkPoint(x, y, r);
  if (!data.error) {
    drawPoint(x, y, r, data.result);
    addToTable(x, y, r, data.result);
  }
}




document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("outputTable");
  if (table) {
    for (let item of table.rows) {
      const x = parseFloat(item.children[0].innerText.trim());
      const y = parseFloat(item.children[1].innerText.trim());
      const r = parseFloat(item.children[2].innerText.trim());
      if (isNaN(x) || isNaN(y) || isNaN(r)) continue;
      const result = item.children[3].innerText.trim() === "Y";
      drawPoint(x, y, r, result);
    }
  }

  svg.addEventListener("click", (event) => {
    if (validateR()) {
      let point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      let ctm = svg.getScreenCTM();
      if (ctm) {
        let invertedCTM = ctm.inverse();
        let svgPoint = point.matrixTransform(invertedCTM);
        let planeCoords = transformSvgToPlane(svgPoint.x, svgPoint.y, r);
        console.log(planeCoords)
        sendCoordinatesToServer(planeCoords.x.toFixed(10), planeCoords.y.toFixed(10), r);
      }
    }
  });

});

document.getElementById("checkButton").onclick = function () {
  clearPoints();
  if (validateX() && validateY() && validateR()) {
    const form = $('<form>', { action: "controller",method: "post" });
    const args = { action: "submitForm", X: x, Y: y, R: r };
    Object.entries(args).forEach(entry => {const [key, value] = entry;
      $('<input>').attr({type: "hidden",name: key,value: value}).appendTo(form);
    });
    form.appendTo('body').submit();

  }
};
//-----------------------------------------------
function createNotification(message) {
  let notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function validateX() {
  x = document.querySelector("input[name=X]").value.replace(",", ".");
  if (x === undefined || x === "") {
    createNotification("X не введён");
    return false;
  } else if (!isNumeric(x)) {
    createNotification("X не число");
    return false;
  } else if (!(-5 < x && x < 3)) {
    createNotification("X не входит в область допустимых значений (-3 < X < 5)");
    return false;
  } else return true;
}


function validateY() {
  y = document.querySelector("input[name=Y]").value.replace(",", ".");
  if (y === undefined || y === "") {
    createNotification("Y не введён");
    return false;
  } else if (!isNumeric(y)) {
    createNotification("Y не число");
    return false;
  } else if (!(y > -5 && y < 5)) {
    createNotification("Y не входит в область допустимых значений (-5 < Y < 5)");
    return false;
  } else return true;
}
function onlyOneCheckbox(selectedCheckbox) {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
    if (checkbox !== selectedCheckbox) {
      checkbox.checked = false;
    }
  });
  clearPoints();
  if(validateR()){
    const table = document.getElementById("outputTable");
    if (table) {
      for (let item of table.rows) {
        const xx = parseFloat(item.children[0].innerText.trim());
        const yy = parseFloat(item.children[1].innerText.trim());
        const rr = parseFloat(item.children[2].innerText.trim());
        if (isNaN(xx) || isNaN(yy) || isNaN(rr)) continue;
        const result = item.children[3].innerText.trim() === "Y";
        let ww=parseFloat(r)
        drawPoint(xx, yy, ww, result);
        }
      }
    }
}
function validateR() {
  try {
    r = document.querySelector("input[type=checkbox]:checked").value;
    return true;
  } catch (err) {
    createNotification("Значение R не выбрано");
    return false;
  }
}

function transformSvgToPlane(svgX, svgY, r) {
  let planeX = r * (svgX - 400) / 300;
  let planeY = r * (400 - svgY) / 300;
  return { x: planeX, y: planeY };
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
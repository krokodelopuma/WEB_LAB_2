let r = 2;
let dots = [];

// отправка через гет
function sendRequest(x, y, r) {
    dots.push(x);
    dots.push(y);
    var xhr = new XMLHttpRequest();
    var url = "controller?X=" + encodeURIComponent(x) + "&Y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //window.location.href = "result.jsp";
            document.getElementById("table_shot").innerHTML = `
                        <tr>
                            <td>x</td>
                            <td>y</td>
                            <td>r</td>
                            <td>check</td>
                        </tr>` + xhr.responseText;
        }


    };
    xhr.send();

    return false;
}

function new_row(x,y,r,isHit){


    let table = document.getElementById("table_shot"); // Находим HTML-таблицу

    let row = document.createElement("tr"); // Создаем новую строку

    let cellX = document.createElement("td"); // Создаем ячейку для x
    cellX.textContent = x;
    row.appendChild(cellX);

    let cellY = document.createElement("td");
    cellY.textContent = y;
    row.appendChild(cellY);

    let cellR = document.createElement("td");
    cellR.textContent = r;
    row.appendChild(cellR);

    let cellStatus = document.createElement("td");
    cellStatus.textContent = isHit;
    row.appendChild(cellStatus);

}

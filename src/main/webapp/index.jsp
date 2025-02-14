<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="web.daos.PointDao" %>
<%@ page import="web.models.Point" %>

<!DOCTYPE html>
<html lang="ru-RU">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>урТим</title>
</head>

<body>
<header class="header">
    Белик Тимур Алексеевич Р3114 408245
</header>

<table id="mainTable" class="shaded">
  <tbody>
  <tr>
    <td>Введите X:</td>
    <td><input required name="X" class="illuminated animated" type="text"></td>
  </tr>

  <tr>
    <td>Введите Y:</td>
    <td><input required name="Y" class="illuminated animated" type="text"></td>
  </tr>

  <tr>
    <td>Выберите R:</td>
    <td>1<input name="R" class="illuminated animated" type="checkbox" value="1" onclick="onlyOneCheckbox(this)"></td>
    <td>2<input name="R" class="illuminated animated" type="checkbox" value="2" onclick="onlyOneCheckbox(this)"></td>
    <td>3<input name="R" class="illuminated animated" type="checkbox" value="3" onclick="onlyOneCheckbox(this)"></td>
    <td>4<input name="R" class="illuminated animated" type="checkbox" value="4" onclick="onlyOneCheckbox(this)"></td>
    <td>5<input name="R" class="illuminated animated" type="checkbox" value="5" onclick="onlyOneCheckbox(this)"></td>
  </tr>

  <tr>
    <td>
      <svg xmlns="http://www.w3.org/2000/svg" id="svg" width="800" height="800" viewBox="0 0 800 800">
        <line x1="100" y1="400" x2="700" y2="400" stroke="#000720"></line>
        <line x1="400" y1="100" x2="400" y2="700" stroke="#000720"></line>
        <text x="400" y="700">R</text>
        <text x="400" y="550">R/2</text>
        <text x="400" y="250">-R/2</text>
        <text x="400" y="1000">-R</text>
        <text x="700" y="400">R</text>
        <text x="550" y="400">R/2</text>
        <text x="250" y="400">-R/2</text>
        <text x="100" y="400">-R</text>

        <rect x="100" y="100" width="300" height="300" fill-opacity="0.4" stroke="navy" fill="blue"></rect>
        <polygon points="400,400 700,400 400,550" fill-opacity="0.4" stroke="navy" fill="blue"></polygon>
        <path d="M400 400 L 550 400 C 550 313 487 250 400 250 L Z" fill-opacity="0.4" stroke="navy" fill="blue"></path>
      </svg>
    </td>
  </tr>

  <tr>
    <td>
      <button type="submit" id="checkButton">Проверить</button>
    </td>
  </tr>


  </tbody>

  <tfoot>
  <tr>
    <td colspan="5" id="outputContainer">
      <% PointDao dao = (PointDao) request.getSession().getAttribute("bean"); if (dao == null) { %>
      <table id="outputTable">
        <tr>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Точка входит в ОДЗ</th>
        </tr>
      </table>
      <% } else { %>
      <table id="outputTable">
        <tr>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Точка входит в ОДЗ</th>
        </tr>
        <% for (Point point : dao.getPoints()) { %>
        <tr>
          <td><%= point.getX() %></td>
          <td><%= point.getY() %></td>
          <td><%= point.getR() %></td>
          <td><%= point.isInArea() ? "<span class=\"success\">Y</span>" : "<span class=\"fail\">N</span>" %></td>
        </tr>
        <% } %>
      </table>
      <% } %>
    </td>
  </tr>
  </tfoot>

</table>

<script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>

</html>
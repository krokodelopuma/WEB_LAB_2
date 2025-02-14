package web.servlets;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import com.google.gson.Gson;

import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        predrequest(request, response);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        predrequest(request, response);
    }
    public void predrequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final var erorsmas1 = "1";
        final var erorsmas2 = "2";
        final var erorsmas3 = "3";
        final var erorsmas = "проблемы с отправкой";

        try {
            /*
            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            while (reader.ready())
            sb.append(reader.readLine()).append('\n');
            */
            System.out.println(request.getParameter("X")+"");
            if ((request.getParameter("X") == null || request.getParameter("X").isEmpty())  || (request.getParameter("Y") == null || request.getParameter("Y").isEmpty()) ||(request.getParameter("R") == null || request.getParameter("R").isEmpty()) ) {
                Erors(response, erorsmas1);
                //Erors(response, sb.toString());
                return;
            }
            if (Double.parseDouble(request.getParameter("X")) < -5 || Double.parseDouble(request.getParameter("X")) > 3) {
                Erors(response, erorsmas2);
                return;
            }
            if (Double.parseDouble(request.getParameter("Y")) < -3 || Double.parseDouble(request.getParameter("Y")) > 5) {
                Erors(response, erorsmas3);
                return;
            }
            Integer.parseInt(request.getParameter("R"));
            RequestDispatcher requestDispatcher = request.getRequestDispatcher("./checkArea");
            requestDispatcher.forward(request, response);
        } catch (Exception e) {
            Erors(response, e.toString());
        }
    }

    private void Erors(HttpServletResponse response, String errorMessage) throws IOException {
        var json = new Gson();
        response.setContentType("application/json");
        response.getWriter().write(json.toJson("error"+errorMessage));
    }
}

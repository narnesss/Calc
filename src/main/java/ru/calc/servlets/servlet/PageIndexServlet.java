package ru.calc.servlets.servlet;

import ru.calc.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/index")
public class PageIndexServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    final HttpSession session = request.getSession();
    final User.ROLE role = (User.ROLE) session.getAttribute("role");
    System.out.println(role);

    if (role == null || role.equals(User.ROLE.UNKNOWN)) {
      response.sendRedirect("/");

    } else {

      request.getRequestDispatcher("/WEB-INF/view/index.jsp").forward(request, response);
    }

  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

  }
}

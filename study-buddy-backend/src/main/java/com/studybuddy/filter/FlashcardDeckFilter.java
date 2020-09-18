package com.studybuddy.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import static com.studybuddy.provider.AccessTokenProvider.*;

@Component
public class FlashcardDeckFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}
	
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		System.out.println("test123");
		Optional<String> userFromToken = getUserIdFromToken(request);
		System.out.println("User id is present: "+userFromToken.isPresent());
	    if (!userFromToken.isPresent()) {
	      response.sendError(HttpStatus.UNAUTHORIZED.value(), "Invalid access token.");
	      return;
	    }
		System.out.println("userFromToken "+userFromToken.get());
	    
	    addAuthentication(response, userFromToken.get());
	    request.setAttribute("userId", userFromToken.get());
	    System.out.println("Thing1: "+(String) request.getAttribute("userId"));
	    filterChain.doFilter(request, response);
	  }
	
	@Override
	public void destroy() {
	}
	
}

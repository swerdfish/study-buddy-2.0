package com.studybuddy.filter;

import java.io.IOException;
import java.security.GeneralSecurityException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.studybuddy.exception.InvalidTokenException;
import com.studybuddy.model.User;
import com.studybuddy.provider.AccessTokenProvider;
import com.studybuddy.verifier.GoogleTokenVerifier;

@Component
public class UserFilter implements Filter {

	private GoogleTokenVerifier googleTokenVerifier;

	@Autowired
	public UserFilter(GoogleTokenVerifier googleTokenVerifier) {
		this.googleTokenVerifier = googleTokenVerifier;
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		System.out.println("In User Filter");
//	    String idToken = ((HttpServletRequest) servletRequest).getHeader("X-ID-TOKEN");
	    String idToken = ((HttpServletRequest) servletRequest).getHeader("Authorization");
	    HttpServletResponse response = (HttpServletResponse) servletResponse;

	    System.out.println(idToken);
	    if (idToken != null) {
	      final Payload payload;
	      try {
	        payload = googleTokenVerifier.verify(idToken);
	        if (payload != null) {
	          String username = payload.getSubject();
	          User u = new User(0, payload.getEmail(),
	        		  (String) payload.get("given_name"),
	        		  (String) payload.get("family_name"));
	          System.out.println(u);
	          servletRequest.setAttribute("user", u);
	          AccessTokenProvider.addAuthentication(response, username);
	          filterChain.doFilter(servletRequest, response);
	          return;
	        }
	      } catch (GeneralSecurityException | InvalidTokenException e) {
	        // This is not a valid token, we will send HTTP 401 back
	    	  response.sendError(401, e.getMessage());
	      }
	    } else {
//	    ((HttpServletResponse) servletResponse).sendError(HttpServletResponse.SC_UNAUTHORIZED);
	    	response.sendError(401, "No id token found.");
	    }
	}

	@Override
	public void destroy() {
	}

}

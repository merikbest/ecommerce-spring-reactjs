package com.gmail.merikbest2015.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Authentication filter class to get the JWT token from the request, validate it, load the user
 * associated with the token, and pass it to Spring Security.
 * The @Component annotation indicates that this class is a "component". Such classes are considered
 * as candidates for auto-detection when using annotation-based configuration and classpath scanning.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Component
public class JwtFilter extends GenericFilterBean {
    /**
     * Object for generating and verifying JWT.
     */
    private final JwtProvider jwtProvider;

    /**
     * Constructor for initializing the main variables of the JWT filter.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param jwtProvider object for generating and verifying JWT.
     */
    @Autowired
    public JwtFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    /**
     * Method of the Filter is called by the container each time a request/response
     * pair is passed through the chain due to a client request for a resource
     * at the end of the chain. The FilterChain passed in to this method allows
     * the Filter to pass on the request and response to the next entity in the chain.
     *
     * @param servletRequest  the request to process.
     * @param servletResponse the response associated with the request.
     * @param filterChain     provides access to the next filter in the chain for this
     *                        filter to pass the request and response to for further
     *                        processing.
     *
     * @throws IOException      if an I/O error occurs during this filter's
     *                          processing of the request
     * @throws ServletException if the processing fails for any other reason
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String token = jwtProvider.resolveToken((HttpServletRequest) servletRequest);

        try {
            if (token != null && jwtProvider.validateToken(token)) {
                Authentication authentication = jwtProvider.getAuthentication(token);

                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (JwtAuthenticationException e) {
            SecurityContextHolder.clearContext();
            ((HttpServletResponse) servletResponse).sendError(e.getHttpStatus().value());
            throw new JwtAuthenticationException("JWT token is expired or invalid");
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}

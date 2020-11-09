package com.gmail.merikbest2015.ecommerce.security;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

/**
 * Exception for JWT authentication.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Getter
public class JwtAuthenticationException extends AuthenticationException {
    /**
     * HTTP status codes.
     */
    private HttpStatus httpStatus;

    /**
     * Constructs an JwtAuthenticationException with the specified message.
     *
     * @param msg the detail message.
     */
    public JwtAuthenticationException(String msg) {
        super(msg);
    }

    /**
     * Constructs an JwtAuthenticationException with the specified message and HTTP status code.
     *
     * @param msg        the detail message.
     * @param httpStatus HTTP status.
     */
    public JwtAuthenticationException(String msg, HttpStatus httpStatus) {
        super(msg);
        this.httpStatus = httpStatus;
    }
}

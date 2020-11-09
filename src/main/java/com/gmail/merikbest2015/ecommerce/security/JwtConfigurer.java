package com.gmail.merikbest2015.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

/**
 * Class for configure JWT.
 * The @Component annotation indicates that this class is a "component". Such classes are considered
 * as candidates for auto-detection when using annotation-based configuration and classpath scanning.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Component
public class JwtConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    /**
     * Authentication filter class to get the JWT token from the request.
     */
    private final JwtFilter jwtFilter;

    /**
     * Constructor for initializing the main variables of the JWT filter.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param jwtFilter authentication filter class to get the JWT token from the request.
     */
    @Autowired
    public JwtConfigurer(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Override
    public void configure(HttpSecurity builder) {
        builder.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}

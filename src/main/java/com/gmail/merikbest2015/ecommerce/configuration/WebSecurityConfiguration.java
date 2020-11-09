package com.gmail.merikbest2015.ecommerce.configuration;

import com.gmail.merikbest2015.ecommerce.security.JwtConfigurer;
import com.gmail.merikbest2015.ecommerce.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Security configuration class.
 * The class extends the {@link WebSecurityConfigurerAdapter} class.
 * Marked with @Configuration annotation - the class is the source of the bean definition.
 * The @EnableWebSecurity annotation in conjunction with the {@link WebSecurityConfigurerAdapter} class
 * works to provide authentication.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see UserServiceImpl
 * @see PasswordEncoder
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    /**
     * Class for configure JWT.
     */
    private final JwtConfigurer jwtConfigurer;

    /**
     * Constructor for initializing the main variables of the WebSecurityConfiguration class.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param jwtConfigurer class for configure JWT.
     */
    @Autowired
    public WebSecurityConfiguration(JwtConfigurer jwtConfigurer) {
        this.jwtConfigurer = jwtConfigurer;
    }

    /**
     * Configuring rules for user access to site pages.
     * The addresses of resources with limited access are indicated.
     *
     * @param http object of the {@link HttpSecurity} for setting access rights to pages.
     * @throws Exception exception methods of the {@link HttpSecurity} class.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/rest",
                        "/api/v1/rest/product/*",
                        "/api/v1/rest/admin/*",
                        "/api/v1/rest/admin/user/*",
                        "/api/v1/rest/registration",
                        "/api/v1/rest/activate/*",
                        "/api/v1/rest/menu/**",
                        "/api/v1/rest/cart",
                        "/api/v1/rest/cart/*",
                        "/api/v1/rest/order",
                        "/api/v1/rest/order/*",
                        "/api/v1/rest/user/*",
                        "/img/**",
                        "/static/**",
                        "/activate/*",
                        "/menu/**").permitAll()
                .antMatchers("/api/v1/rest/login").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .apply(jwtConfigurer);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

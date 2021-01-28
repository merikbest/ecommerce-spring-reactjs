package com.gmail.merikbest2015.ecommerce.configuration;

import com.gmail.merikbest2015.ecommerce.security.JwtConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtConfigurer jwtConfigurer;

    public WebSecurityConfiguration(JwtConfigurer jwtConfigurer) {
        this.jwtConfigurer = jwtConfigurer;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/home",
                        "/api/v1/home/product/*",
                        "/api/v1/admin/*",
                        "/api/v1/admin/user/*",
                        "/api/v1/registration",
                        "/api/v1/registration/activate/*",
                        "/api/v1/forgot",
                        "/api/v1/reset/**",
                        "/api/v1/menu/**",
                        "/api/v1/cart",
                        "/api/v1/cart/*",
                        "/api/v1/order",
                        "/api/v1/order/*",
                        "/api/v1/user/*",
                        "/img/**",
                        "/static/**",
                        "/activate/*",
                        "/menu/**").permitAll()
                .antMatchers("/api/v1/login").permitAll()
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

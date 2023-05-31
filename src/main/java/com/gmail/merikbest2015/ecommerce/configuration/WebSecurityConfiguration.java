package com.gmail.merikbest2015.ecommerce.configuration;

import com.gmail.merikbest2015.ecommerce.security.oauth2.CustomOAuth2UserService;
import com.gmail.merikbest2015.ecommerce.security.JwtConfigurer;
import com.gmail.merikbest2015.ecommerce.security.oauth2.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final JwtConfigurer jwtConfigurer;
    private final OAuth2SuccessHandler oauthSuccessHandler;
    private final CustomOAuth2UserService oAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable().authorizeRequests()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/auth/**",
                        "/api/v1/auth/login",
                        "/api/v1/registration/**",
                        "/api/v1/perfumes/**",
                        "/api/v1/users/cart",
                        "/api/v1/order/**",
                        "/api/v1/review/**",
                        "/websocket", "/websocket/**",
                        "/img/**",
                        "/static/**").permitAll()
                .antMatchers("/auth/**", "/oauth2/**", "/**/*swagger*/**", "/v2/api-docs").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .authorizationEndpoint().baseUri("/oauth2/authorize")
                .and()
                .userInfoEndpoint().userService(oAuth2UserService)
                .and()
                .successHandler(oauthSuccessHandler)
                .and()
                .apply(jwtConfigurer);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}

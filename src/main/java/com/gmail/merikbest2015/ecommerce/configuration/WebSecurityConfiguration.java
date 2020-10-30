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
 * @version 1.0
 * @see UserServiceImpl
 * @see PasswordEncoder
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    //7
    private final JwtConfigurer jwtConfigurer;

    @Autowired
    public WebSecurityConfiguration(JwtConfigurer jwtConfigurer) {
        this.jwtConfigurer = jwtConfigurer;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //7.1
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/rest",
                        "/api/v1/rest/product/*",
                        "/api/v1/rest/admin/*",
                        "/api/v1/rest/registration",
                        "/api/v1/rest/activate/*",
                        "/api/v1/rest/menu/search",
                        "/img/**",
                        "/static/**",
                        "/activate/*",
                        "/menu/**").permitAll()
                .antMatchers("/api/v1/rest/login").permitAll() //7.3
                .anyRequest()
                .authenticated()
                .and()
                .apply(jwtConfigurer); //7.2
    }

    //7.5
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}


//
//    /**
//     * Service object for working with registered users.
//     * The @Autowired annotation will allow Spring to automatically initialize objects.
//     */
//    @Autowired
//    private UserServiceImpl userService;
//
//    /**
//     * Service object for encoding passwords.
//     * The @Autowired annotation will allow Spring to automatically initialize objects.
//     */
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    /**
//     * Configuring rules for user access to site pages.
//     * The addresses of resources with limited access are indicated.
//     *
//     * @param http object of the {@link HttpSecurity} for setting access rights to pages.
//     * @throws Exception exception methods of the {@link HttpSecurity} class.
//     */
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/",
//                        "/rest/**",
////                            "/**/*.png",
////                            "/**/*.gif",
////                            "/**/*.svg",
////                            "/**/*.jpg",
//                        "/search",
//                        "/registration",
//                        "/contacts",
//                        "/img/**",
//                        "/static/**",
//                        "/activate/*",
//                        "/product/*",
//                        "/menu/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/rest/login")
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll()
//                .and().csrf().disable();
//    }
//
//    /**
//     * Setting up users with their roles. Users will be loaded from the database
//     * using the implementation of the {@link UserDetailsService} interface methods.
//     *
//     * @param auth object of the {@link AuthenticationManagerBuilder}.
//     * @throws Exception exception methods of the {@link AuthenticationManagerBuilder}.
//     */
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userService)
//                .passwordEncoder(passwordEncoder);
//    }
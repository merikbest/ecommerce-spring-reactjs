package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.domain.dto.AuthenticationRequestDTO;
import com.gmail.merikbest2015.ecommerce.security.JwtProvider;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

//1
@RestController
@RequestMapping("/api/v1/rest")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @Autowired
    public AuthenticationRestController(AuthenticationManager authenticationManager, UserService userService, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request) {
        //6
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = userService.findByEmail(request.getEmail());

            if (user == null) {
                throw new UsernameNotFoundException("User doesn't exist");
            }

            String userRole = user.getRoles().iterator().next().name();
            String token = jwtProvider.createToken(request.getEmail(), userRole);

            Map<Object, Object> response = new HashMap<>();
            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("userRole", userRole);

            return ResponseEntity.ok(response);

        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid email/password combination", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }
}

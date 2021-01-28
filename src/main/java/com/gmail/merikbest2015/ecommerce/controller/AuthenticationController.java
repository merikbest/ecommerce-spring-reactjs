package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetDto;
import com.gmail.merikbest2015.ecommerce.security.JwtProvider;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                    UserService userService,
                                    JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDto request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = userService.findByEmail(request.getEmail());
            String userRole = user.getRoles().iterator().next().name();
            String token = jwtProvider.createToken(request.getEmail(), userRole);
            List<Perfume> perfumeList = user.getPerfumeList();

            Map<Object, Object> response = new HashMap<>();
            response.put("email", request.getEmail());
            response.put("token", token);
            response.put("userRole", userRole);
            response.put("perfumeList", perfumeList);

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Incorrect password or email", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetDto passwordReset) {
        boolean forgotPassword = userService.sendPasswordResetCode(passwordReset.getEmail());
        if (!forgotPassword) {
            return new ResponseEntity<>("Email not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Reset password code is send to your E-mail", HttpStatus.OK);
    }

    @GetMapping("/reset/{code}")
    public ResponseEntity<?> getPasswordResetCode(@PathVariable String code) {
        User user = userService.findByPasswordResetCode(code);
        if (user == null) {
            return new ResponseEntity<>("Password reset code is invalid!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/reset")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetDto passwordReset) {
        Map<String, String> errors = new HashMap<>();
        boolean isConfirmEmpty = StringUtils.isEmpty(passwordReset.getPassword2());
        boolean isPasswordDifferent = passwordReset.getPassword() != null &&
                !passwordReset.getPassword().equals(passwordReset.getPassword2());
        if (isConfirmEmpty) {
            errors.put("password2Error", "Password confirmation cannot be empty");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if (isPasswordDifferent) {
            errors.put("passwordError", "Passwords do not match");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        userService.passwordReset(passwordReset);
        return new ResponseEntity<>("Password successfully changed!", HttpStatus.OK);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);
    }
}

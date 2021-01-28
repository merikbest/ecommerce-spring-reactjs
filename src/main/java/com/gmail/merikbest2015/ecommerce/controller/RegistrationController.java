package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/registration")
public class RegistrationController {

    @Value("${recaptcha.secret}")
    private String secret;
    public static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";
    private final UserService userService;
    private final RestTemplate restTemplate;

    public RegistrationController(UserService userService, RestTemplate restTemplate) {
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public ResponseEntity<?> registration(@RequestParam("password2") String passwordConfirm,
                                          @RequestParam("g-recaptcha-response") String captcha,
                                          @Valid User user,
                                          BindingResult bindingResult) {
        String url = String.format(CAPTCHA_URL, secret, captcha);
        CaptchaResponseDto captchaResponse = restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);
        boolean isConfirmEmpty = StringUtils.isEmpty(passwordConfirm);
        boolean isPasswordDifferent = user.getPassword() != null && !user.getPassword().equals(passwordConfirm);
        Map<String, String> errors = new HashMap<>();

        if (isConfirmEmpty) {
            errors.put("password2Error", "Password confirmation cannot be empty");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if (isPasswordDifferent) {
            errors.put("passwordError", "Passwords do not match");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if (bindingResult.hasErrors() || !captchaResponse.isSuccess()) {
            Map<String, String> bindingResultErrors = ControllerUtils.getErrors(bindingResult);
            return new ResponseEntity<>(bindingResultErrors, HttpStatus.BAD_REQUEST);
        }

        if (!userService.addUser(user)) {
            errors.put("emailError", "Email is already used");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        if (!captchaResponse.isSuccess()) {
            errors.put("captchaError", "Fill captcha");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<?> activateEmailCode(@PathVariable String code) {
        boolean isActivated = userService.activateUser(code);

        if (isActivated) {
            return new ResponseEntity<>("User successfully activated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Activation code not found", HttpStatus.NOT_FOUND);
        }
    }
}

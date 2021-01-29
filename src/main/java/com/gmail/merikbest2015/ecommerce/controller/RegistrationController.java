package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
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
    private final UserMapper userMapper;
    private final RestTemplate restTemplate;

    public RegistrationController(UserMapper userMapper, RestTemplate restTemplate) {
        this.userMapper = userMapper;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public ResponseEntity<?> registration(@RequestParam("password2") String passwordConfirm,
                                          @RequestParam("g-recaptcha-response") String captcha,
                                          @Valid UserDto userDto,
                                          BindingResult bindingResult) {
        String url = String.format(CAPTCHA_URL, secret, captcha);
        CaptchaResponseDto captchaResponse = restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);
        boolean isConfirmEmpty = StringUtils.isEmpty(passwordConfirm);
        boolean isPasswordDifferent = userDto.getPassword() != null && !userDto.getPassword().equals(passwordConfirm);
        Map<String, String> errors = new HashMap<>();

        if (isConfirmEmpty) {
            errors.put("password2Error", "Password confirmation cannot be empty");
            return ResponseEntity.badRequest().body(errors);
        }

        if (isPasswordDifferent) {
            errors.put("passwordError", "Passwords do not match");
            return ResponseEntity.badRequest().body(errors);
        }

        if (bindingResult.hasErrors() || !captchaResponse.isSuccess()) {
            Map<String, String> bindingResultErrors = ControllerUtils.getErrors(bindingResult);
            return ResponseEntity.badRequest().body(bindingResultErrors);
        }

        if (!userMapper.addUser(userDto)) {
            errors.put("emailError", "Email is already used");
            return ResponseEntity.badRequest().body(errors);
        }

        if (!captchaResponse.isSuccess()) {
            errors.put("captchaError", "Fill captcha");
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok("User successfully registered.");
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        boolean isActivated = userMapper.activateUser(code);

        if (isActivated) {
            return ResponseEntity.ok("User successfully activated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation code not found");
        }
    }
}

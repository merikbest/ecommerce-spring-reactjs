package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.exception.EmailException;
import com.gmail.merikbest2015.ecommerce.exception.InputFieldException;
import com.gmail.merikbest2015.ecommerce.exception.PasswordException;
import com.gmail.merikbest2015.ecommerce.mapper.UserMapper;
import com.gmail.merikbest2015.ecommerce.utils.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/registration")
public class RegistrationController {

    @Value("${recaptcha.secret}")
    private String secret;
    private final UserMapper userMapper;
    private final RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<String> registration(@Valid @RequestBody UserDtoIn user, BindingResult bindingResult) {
        ControllerUtils.captchaValidation(secret, user.getCaptcha(), restTemplate);

        if (ControllerUtils.isPasswordDifferent(user.getPassword(), user.getPassword2())) {
            throw new PasswordException("Passwords do not match.");
        }
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        if (!userMapper.addUser(user)) {
            throw new EmailException("Email is already used.");
        }
        return ResponseEntity.ok("User successfully registered.");
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        if (userMapper.activateUser(code)) {
            return ResponseEntity.ok("User successfully activated.");
        } else {
            throw new ApiRequestException("Activation code not found.", HttpStatus.NOT_FOUND);
        }
    }
}

package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.exception.*;
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
    public ResponseEntity<String> registration(@RequestParam("password2") String passwordConfirm,
                                               @RequestParam("g-recaptcha-response") String captcha,
                                               @Valid @ModelAttribute UserDtoIn userDtoIn,
                                               BindingResult bindingResult) {

        CaptchaResponseDto captchaResponse = ControllerUtils.captchaValidation(secret, captcha, restTemplate);

        if (bindingResult.hasErrors() || !captchaResponse.isSuccess()) {
            throw new InputFieldException(bindingResult);
        }

        if (ControllerUtils.isPasswordConfirmEmpty(passwordConfirm)) {
            throw new PasswordConfirmationException("Password confirmation cannot be empty.");
        }

        if (ControllerUtils.isPasswordDifferent(userDtoIn.getPassword(), passwordConfirm)) {
            throw new PasswordException("Passwords do not match.");
        }

        if (!userMapper.addUser(userDtoIn)) {
            throw new EmailException("Email is already used.");
        }

        if (!captchaResponse.isSuccess()) {
            throw new CaptchaException("Fill captcha.");
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

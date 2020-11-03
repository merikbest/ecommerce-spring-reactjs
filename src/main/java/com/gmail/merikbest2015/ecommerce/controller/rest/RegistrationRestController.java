package com.gmail.merikbest2015.ecommerce.controller.rest;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping("/api/v1/rest")
public class RegistrationRestController {

    public static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    private final UserService userService;

    private final RestTemplate restTemplate;

    @Value("${recaptcha.secret}")
    private String secret;

    @Autowired
    public RegistrationRestController(UserService userService, RestTemplate restTemplate) {
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(
            @RequestParam("password2") String passwordConfirm,
            @RequestParam("g-recaptcha-response") String captcha,
            @Valid User user,
            BindingResult bindingResult
    ) {
        String url = String.format(CAPTCHA_URL, secret, captcha);
        CaptchaResponseDto captchaResponse = restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);

        boolean isConfirmEmpty = StringUtils.isEmpty(passwordConfirm);
        boolean isPasswordDifferent = user.getPassword() != null && !user.getPassword().equals(passwordConfirm);
        Map<String, String> errors = new HashMap<>();

        if (isConfirmEmpty) {
            errors.put("password2Error", "Подтверждение пароля не может быть пустым");

            return ResponseEntity.badRequest().body(errors);
        }

        if (isPasswordDifferent) {
            errors.put("passwordError", "Пароли не совпадают");

            return ResponseEntity.badRequest().body(errors);
        }

        if (bindingResult.hasErrors() || !captchaResponse.isSuccess()) {
            Map<String, String> bindingResultErrors = ControllerUtils.getErrors(bindingResult);

            return ResponseEntity.badRequest().body(bindingResultErrors);
        }

        if (!userService.addUser(user)) {
            errors.put("emailError", "E-mail занят другим пользователем.");

            return ResponseEntity.badRequest().body(errors);
        }

        if (!captchaResponse.isSuccess()) {
            errors.put("captchaError", "Fill captcha");

            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok("OK");
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<?> activateEmailCode(@PathVariable String code) {
        boolean isActivated = userService.activateUser(code);
        Map<String, String> response = new HashMap<>();

        if (isActivated) {
            response.put("messageType", "alert-success");
            response.put("message", "Пользователь успешно активирован");
        } else {
            response.put("messageType", "alert-danger");
            response.put("message", "Код активации не найден");
        }

        return ResponseEntity.ok(response);
    }
}

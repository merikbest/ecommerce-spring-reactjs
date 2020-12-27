package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

/**
 * Registration controller class.
 * This controller and related pages can be accessed by all users, regardless of their roles.
 * The @RestController it's a convenience annotation that combines @Controller and @ResponseBody. Annotation serves to
 * inform Spring that this class is a bean and must be loaded when the application starts.
 * The @RequestMapping("/api/v1/rest") annotation informs that this controller will process requests whose URI begins
 * with "/api/v1/rest".
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 2.0
 * @see User
 * @see UserService
 * @see RestTemplate
 */
@RestController
@RequestMapping("/api/v1/rest")
public class RegistrationRestController {
    /**
     * URL for request to the google server.
     */
    public static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    /**
     * Service object for working with users.
     */
    private final UserService userService;

    /**
     * Object which offers templates for common scenarios by HTTP method.
     */
    private final RestTemplate restTemplate;

    /**
     * reCAPTCHA Secret.
     */
    @Value("${recaptcha.secret}")
    private String secret;

    /**
     * Constructor for initializing the main variables of the registration controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService  service object for working with users.
     * @param restTemplate object which offers templates for common scenarios by HTTP method.
     */
    @Autowired
    public RegistrationRestController(UserService userService, RestTemplate restTemplate) {
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    /**
     * Saves user credentials.
     * URL request {"/registration"}, method POST.
     *
     * @param passwordConfirm user password.
     * @param captcha         captcha response.
     * @param user            valid user.
     * @param bindingResult   errors in validating http request.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
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

    /**
     * Returns a message that the user has activated the activation code and registered on the site.
     * URL request {"/activate/{code}"}, method GET.
     *
     * @param code activation code.
     * @return ResponseEntity with HTTP response: status code, headers, and body.
     */
    @GetMapping("/activate/{code}")
    public ResponseEntity<?> activateEmailCode(@PathVariable String code) {
        boolean isActivated = userService.activateUser(code);
        Map<String, String> response = new HashMap<>();

        if (isActivated) {
            response.put("messageType", "alert-success");
            response.put("message", "User successfully activated");
        } else {
            response.put("messageType", "alert-danger");
            response.put("message", "Activation code not found");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

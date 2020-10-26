package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.domain.dto.CaptchaResponseDto;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

/**
 * Registration controller class.
 * This controller and related pages can be accessed by all users, regardless of their roles.
 * The @Controller annotation serves to inform Spring that this class is a bean and must be
 * loaded when the application starts.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see UserService
 * @see RestTemplate
 */
@Controller
@Slf4j
public class RegistrationController {
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
     * Constructor for initializing the main variables of the cart controller.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userService  service object for working with users.
     * @param restTemplate object which offers templates for common scenarios by HTTP method.
     */
    @Autowired
    public RegistrationController(UserService userService, RestTemplate restTemplate) {
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    /**
     * Returns registration page.
     * URL request {"/registration"}, method GET.
     *
     * @return registration page.
     */
    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    /**
     * Saves user credentials and redirect to login page.
     * URL request {"/registration"}, method POST.
     *
     * @param passwordConfirm user password.
     * @param captchaResponse captcha response.
     * @param user            valid user.
     * @param bindingResult   errors in validating http request.
     * @param model           class object {@link Model}.
     * @return redirect to login page with model attributes.
     */
    @PostMapping("/registration")
    public String registration(
            @RequestParam("password2") String passwordConfirm,
            @RequestParam("g-recaptcha-response") String captchaResponse,
            @Valid User user,
            BindingResult bindingResult,
            Model model
    ) {
        String url = String.format(CAPTCHA_URL, secret, captchaResponse);

        CaptchaResponseDto response = restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);

        if (!response.isSuccess()) {
            model.addAttribute("captchaError", "Fill captcha");
        }

        boolean isConfirmEmpty = StringUtils.isEmpty(passwordConfirm);
        boolean isPasswordDifferent = user.getPassword() != null && !user.getPassword().equals(passwordConfirm);

        if (isConfirmEmpty) {
            model.addAttribute("password2Error", "Подтверждение пароля не может быть пустым");
        }

        if (isPasswordDifferent) {
            model.addAttribute("passwordError", "Пароли не совпадают");
        }

        if (isConfirmEmpty || isPasswordDifferent || bindingResult.hasErrors() || !response.isSuccess()) {
            Map<String, String> errors = ControllerUtils.getErrors(bindingResult);

            model.mergeAttributes(errors);

            return "registration";
        }

        if (!userService.addUser(user)) {
            model.addAttribute("usernameError", "Пользователь существует!");
            return "registration";
        }

        log.debug("User {} registered", user.getUsername());

        return "redirect:/login";
    }

    /**
     * Returns a message that the user has activated the activation code
     * and registered on the site.
     * URL request {"/activate/{code}"}, method GET.
     *
     * @param code  activation code.
     * @param model class object {@link Model}.
     * @return login page with model attributes.
     */
    @GetMapping("/activate/{code}")
    public String activateEmailCode(@PathVariable String code, Model model) {
        boolean isActivated = userService.activateUser(code);

        if (isActivated) {
            model.addAttribute("messageType", "alert-success");
            model.addAttribute("message", "Пользователь успешно активирован");

        } else {
            model.addAttribute("messageType", "alert-danger");
            model.addAttribute("message", "Код активации не найден");

            log.error("Cant find activation code.");
        }

        return "login";
    }
}
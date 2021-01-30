package com.gmail.merikbest2015.ecommerce.utils;

import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

public class ControllerUtils {

    private static final String CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    public static boolean isPasswordConfirmEmpty(String password2) {
        return StringUtils.isEmpty(password2);
    }

    public static boolean isPasswordDifferent(String password, String password2) {
        return password != null && !password.equals(password2);
    }

    public static CaptchaResponseDto captchaValidation(String secret, String captcha, RestTemplate restTemplate) {
        String url = String.format(CAPTCHA_URL, secret, captcha);
        return restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);
    }
}

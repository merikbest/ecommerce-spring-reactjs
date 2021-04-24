package com.gmail.merikbest2015.ecommerce.utils;

import com.gmail.merikbest2015.ecommerce.dto.CaptchaResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ControllerUtils {

    private final RestTemplate restTemplate;

    @Value("${recaptcha.secret}")
    private String secret;

    @Value("${recaptcha.url}")
    private String captchaUrl;

    public boolean isPasswordConfirmEmpty(String password2) {
        return StringUtils.isEmpty(password2);
    }

    public boolean isPasswordDifferent(String password, String password2) {
        return password != null && !password.equals(password2);
    }

    public CaptchaResponseDto captchaValidation(String captcha) {
        String url = String.format(captchaUrl, secret, captcha);
        return restTemplate.postForObject(url, Collections.emptyList(), CaptchaResponseDto.class);
    }
}

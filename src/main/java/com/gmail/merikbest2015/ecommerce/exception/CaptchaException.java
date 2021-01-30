package com.gmail.merikbest2015.ecommerce.exception;

import lombok.Getter;

@Getter
public class CaptchaException extends RuntimeException {
    private final String captchaError;

    public CaptchaException(String captchaError) {
        this.captchaError = captchaError;
    }
}

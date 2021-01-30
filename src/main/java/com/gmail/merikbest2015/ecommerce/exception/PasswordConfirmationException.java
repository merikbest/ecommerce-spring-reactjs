package com.gmail.merikbest2015.ecommerce.exception;

import lombok.Getter;

@Getter
public class PasswordConfirmationException extends RuntimeException {
    private final String password2Error;

    public PasswordConfirmationException(String password2Error) {
        this.password2Error = password2Error;
    }
}

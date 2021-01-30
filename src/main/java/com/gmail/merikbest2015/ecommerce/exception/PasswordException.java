package com.gmail.merikbest2015.ecommerce.exception;

import lombok.Getter;

@Getter
public class PasswordException extends RuntimeException {
    private final String passwordError;

    public PasswordException(String passwordError) {
        this.passwordError = passwordError;
    }
}

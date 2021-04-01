package com.gmail.merikbest2015.ecommerce.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class RegistrationRequestDto {

    @NotBlank(message = "Fill captcha.")
    private String captcha;

    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @NotBlank(message = "Password confirmation cannot be empty.")
    private String password2;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;
}

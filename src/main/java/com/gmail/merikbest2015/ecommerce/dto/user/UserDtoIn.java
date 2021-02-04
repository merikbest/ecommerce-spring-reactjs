package com.gmail.merikbest2015.ecommerce.dto.user;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UserDtoIn {

    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;
}

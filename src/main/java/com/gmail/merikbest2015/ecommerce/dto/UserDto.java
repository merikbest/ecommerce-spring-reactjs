package com.gmail.merikbest2015.ecommerce.dto;

import com.gmail.merikbest2015.ecommerce.domain.Role;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Data
public class UserDto {

    private Long id;

    @NotBlank(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;
    private boolean active;
    private String activationCode;
    private String passwordResetCode;
    private String token;
    private Set<Role> roles;
    private List<PerfumeDto> perfumeList;
}

package com.gmail.merikbest2015.ecommerce.dto.user;

import com.gmail.merikbest2015.ecommerce.domain.Role;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
public class UserRequestDto {
    
    @NotBlank(message = "Username cannot be empty")
    private String username;
    private String email;
    private boolean active;
    private String activationCode;
    private String passwordResetCode;
    private String token;
    private Set<Role> roles;
}

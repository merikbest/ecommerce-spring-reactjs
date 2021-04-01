package com.gmail.merikbest2015.ecommerce.dto.user;

import com.gmail.merikbest2015.ecommerce.domain.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserResponseDto {
    private Long id;
    private String username;
    private String email;
    private boolean active;
    private String activationCode;
    private String passwordResetCode;
    private String token;
    private Set<Role> roles;
}

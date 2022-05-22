package com.gmail.merikbest2015.ecommerce.dto.auth;

import com.gmail.merikbest2015.ecommerce.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}

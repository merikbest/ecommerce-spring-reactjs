package com.gmail.merikbest2015.ecommerce.domain.dto;

import lombok.Data;

//2
@Data
public class AuthenticationRequestDTO {
    private String email;
    private String password;
}

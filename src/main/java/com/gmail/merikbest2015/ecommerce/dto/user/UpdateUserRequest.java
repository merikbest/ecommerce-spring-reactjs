package com.gmail.merikbest2015.ecommerce.dto.user;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdateUserRequest {
    private Long id;

    @NotBlank(message = "First name cannot be empty")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    private String lastName;

    private String city;
    private String address;
    private String phoneNumber;
    private String postIndex;
}

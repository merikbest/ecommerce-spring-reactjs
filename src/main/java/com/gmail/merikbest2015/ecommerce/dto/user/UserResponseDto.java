package com.gmail.merikbest2015.ecommerce.dto.user;

import com.gmail.merikbest2015.ecommerce.domain.Role;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Set;

@Data
public class UserResponseDto {

    @ApiModelProperty(position = 1, notes = "The database generated user ID", example = "1")
    private Long id;

    @ApiModelProperty(position = 2, notes = "User email", example = "test123@test.com")
    private String email;

    @ApiModelProperty(position = 3, notes = "First Name", example = "John")
    private String firstName;

    @ApiModelProperty(position = 4, notes = "Last Name", example = "Doe")
    private String lastName;

    @ApiModelProperty(position = 5, notes = "City", example = "New York")
    private String city;

    @ApiModelProperty(position = 6, notes = "Address", example = "Wall Street1")
    private String address;

    @ApiModelProperty(position = 7, notes = "Phone Number", example = "123456")
    private String phoneNumber;

    @ApiModelProperty(position = 8, notes = "Post index", example = "123456")
    private String postIndex;

    @ApiModelProperty(position = 9, notes = "Provider", example = "GOOGLE")
    private String provider;

    @ApiModelProperty(position = 10, example = "true")
    private boolean active;

    @ApiModelProperty(position = 11, notes = "User Activation Code")
    private String activationCode;

    @ApiModelProperty(position = 12, notes = "Password Reset Code")
    private String passwordResetCode;

    @ApiModelProperty(position = 13, notes = "User roles", example = "USER")
    private Set<Role> roles;
}

package com.gmail.merikbest2015.ecommerce.dto.order;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
public class OrderRequestDto {

    private Double totalPrice;
    private Map<Long, Long> perfumesId;

    @NotBlank(message = "Fill in the input field")
    private String firstName;

    @NotBlank(message = "Fill in the input field")
    private String lastName;

    @NotBlank(message = "Fill in the input field")
    private String city;

    @NotBlank(message = "Fill in the input field")
    private String address;

    @Email(message = "Incorrect email")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Phone number cannot be empty")
    private String phoneNumber;

    @NotNull(message = "Post index cannot be empty")
    @Min(value = 5, message = "Post index must contain 5 digits")
    private Integer postIndex;
}

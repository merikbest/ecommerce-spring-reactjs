package com.gmail.merikbest2015.ecommerce.dto.order;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OrderResponse {
    private Long id;
    private Double totalPrice;
    private LocalDate date;
    private String firstName;
    private String lastName;
    private String city;
    private String address;
    private String email;
    private String phoneNumber;
    private Integer postIndex;
}

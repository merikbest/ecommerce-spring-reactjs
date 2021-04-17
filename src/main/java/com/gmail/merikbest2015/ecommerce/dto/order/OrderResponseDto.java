package com.gmail.merikbest2015.ecommerce.dto.order;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderResponseDto {

    @ApiModelProperty(position = 1, notes = "The database generated order ID", example = "1")
    private Long id;

    @ApiModelProperty(position = 2, notes = "Order total price", example = "100")
    private Double totalPrice;

    @ApiModelProperty(position = 3, notes = "User Order date", example = "2020 04 04")
    private LocalDate date;

    @ApiModelProperty(position = 4, notes = "First Name", example = "John")
    private String firstName;

    @ApiModelProperty(position = 5, notes = "Last Name", example = "Doe")
    private String lastName;

    @ApiModelProperty(position = 6, notes = "City", example = "New York")
    private String city;

    @ApiModelProperty(position = 7, notes = "Address", example = "Wall Street1")
    private String address;

    @ApiModelProperty(position = 8, notes = "User email", example = "test123@test.com")
    private String email;

    @ApiModelProperty(position = 9, notes = "Phone Number", example = "123456")
    private String phoneNumber;

    @ApiModelProperty(position = 10, notes = "Post index", example = "123456")
    private Integer postIndex;

    @ApiModelProperty(position = 11, notes = "Order items")
    private List<OrderItemResponseDto> orderItems;
}

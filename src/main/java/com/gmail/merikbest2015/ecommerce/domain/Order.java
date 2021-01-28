package com.gmail.merikbest2015.ecommerce.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double totalPrice;
    private LocalDate date;

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

    @OrderColumn
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Perfume> perfumeList;

    @ManyToOne
    private User user;

    public Order(User user) {
        this.date = LocalDate.now();
        this.user = user;
        this.perfumeList = new ArrayList<>();
    }
}

package com.gmail.merikbest2015.ecommerce.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_seq")
    @SequenceGenerator(name = "order_item_seq", sequenceName = "order_item_seq", initialValue = 12, allocationSize = 1)
    private Long id;
    private Long amount;
    private Long quantity;

    @OneToOne
    private Perfume perfume;
}

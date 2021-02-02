package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;

import java.util.List;

public interface OrderService {

    List<Order> findAll();

    List<Order> findOrderByEmail(String email);

    Order postOrder(Order validOrder);

    Order save(Order order);

    Long finalizeOrder();
}

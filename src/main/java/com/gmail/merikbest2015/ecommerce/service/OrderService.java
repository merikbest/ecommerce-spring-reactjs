package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;

import java.util.List;

public interface OrderService {

    List<Order> findAll();

    List<Order> findOrderByUser(User user);

    Order postOrder(Order validOrder, String email);

    Order save(Order order);

    Long finalizeOrder();
}

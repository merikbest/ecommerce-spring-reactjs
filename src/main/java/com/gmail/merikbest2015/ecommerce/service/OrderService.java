package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import graphql.schema.DataFetcher;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<Order> findAll();

    List<Order> findOrderByEmail(String email);

    Order postOrder(Order validOrder, Map<Long, Long> perfumesId);

    List<Order> deleteOrder(Long orderId);

    DataFetcher<List<Order>> getAllOrdersByQuery();

    DataFetcher<List<Order>> getUserOrdersByEmailQuery();

    DataFetcher<List<Order>> getUserOrdersByQuery();

    DataFetcher<Order> getOrderByQuery();
}

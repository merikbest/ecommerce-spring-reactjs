package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import graphql.schema.DataFetcher;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<Order> findAll();

    List<Order> findOrderByEmail(String email);

    Order postOrder(Order validOrder, Map<Long, Long> perfumesId);

    Long finalizeOrder();

    DataFetcher<List<Order>> getAllOrdersByQuery();

    DataFetcher<Order> getOrderByQuery();
}

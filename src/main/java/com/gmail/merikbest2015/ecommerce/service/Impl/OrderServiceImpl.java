package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.repository.OrderRepository;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The service layer class implements the accessor methods of {@link Order} objects
 * in the {@link OrderService} interface database.
 * The class is marked with the @Service annotation - an annotation announcing that this class
 * is a service - a component of the service layer. Service is a subtype of @Component class.
 * Using this annotation will automatically search for service beans.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see Order
 * @see OrderService
 * @see OrderRepository
 */
@Service
public class OrderServiceImpl implements OrderService {
    /**
     * Implementation of the {@link OrderRepository} interface
     * for working with orders with a database.
     */
    private final OrderRepository orderRepository;

    /**
     * Constructor for initializing the main variables of the order service.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param orderRepository implementation of the {@link OrderRepository} interface
     *                        for working with orders with a database.
     */
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Return list of all user orders.
     *
     * @return list of user {@link Order}.
     */
    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    /**
     * Save order info.
     *
     * @param order order object to return.
     * @return The {@link Order} class object which will be saved in the database.
     */
    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Returns list of orders authenticated user.
     *
     * @param user name of authenticated user.
     * @return An object of type {@link List} is a list of orders of authenticated user.
     */
    @Override
    public List<Order> findOrderByUser(User user) {
        return orderRepository.findOrderByUser(user);
    }
}

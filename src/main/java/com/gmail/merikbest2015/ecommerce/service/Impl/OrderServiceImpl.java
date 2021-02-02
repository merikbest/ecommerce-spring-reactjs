package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.repository.OrderRepository;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final MailSender mailSender;

    public OrderServiceImpl(OrderRepository orderRepository, MailSender mailSender) {
        this.orderRepository = orderRepository;
        this.mailSender = mailSender;
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Long finalizeOrder() {
        List<Order> orders = orderRepository.findAll();
        Order orderIndex = orders.get(orders.size() - 1);
        return orderIndex.getId();
    }

    @Override
    public List<Order> findOrderByEmail(String email) {
        return orderRepository.findOrderByEmail(email);
    }

    @Override
    public Order postOrder(Order validOrder) {
        Order order = new Order();
        order.getPerfumeList().addAll(validOrder.getPerfumeList());
        order.setTotalPrice(validOrder.getTotalPrice());
        order.setFirstName(validOrder.getFirstName());
        order.setLastName(validOrder.getLastName());
        order.setCity(validOrder.getCity());
        order.setAddress(validOrder.getAddress());
        order.setPostIndex(validOrder.getPostIndex());
        order.setEmail(validOrder.getEmail());
        order.setPhoneNumber(validOrder.getPhoneNumber());
        orderRepository.save(order);

        StringBuilder perfumes = new StringBuilder();
        order.getPerfumeList().forEach((perfume) ->
        {
            perfumes.append(perfume.getPerfumer());
            perfumes.append(" ");
            perfumes.append(perfume.getPerfumeTitle());
            perfumes.append(" — $");
            perfumes.append(perfume.getPrice());
            perfumes.append(".00");
            perfumes.append("\n");
        });

        String subject = "Order #" + order.getId();
        String message = "Hello " + order.getFirstName() + "!\n" +
                "Thank you for your order in Perfume online store.\n" +
                "Your order number is " + order.getId() + "\n" +
                "Date: " + order.getDate() + "\n" +
                "Name: " + order.getFirstName() + " " + order.getLastName() + "\n" +
                "Address: " + order.getCity() + ", " + order.getAddress() + "\n" +
                "Post index: " + order.getPostIndex() + "\n" +
                "Phone: " + order.getPhoneNumber() + "\n" +
                "Perfumes: " + "\n" + perfumes + "\n" +
                "Total price: $" + order.getTotalPrice();
        mailSender.send(order.getEmail(), subject, message);
        return order;
    }
}

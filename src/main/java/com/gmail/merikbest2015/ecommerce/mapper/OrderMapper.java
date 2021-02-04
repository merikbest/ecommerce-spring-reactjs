package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoOut;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    private final ModelMapper modelMapper;
    private final OrderService orderService;

    private Order convertToEntity(OrderDtoIn orderDto) {
        return modelMapper.map(orderDto, Order.class);
    }

    private OrderDtoIn convertToDtoIn(Order order) {
        return modelMapper.map(order, OrderDtoIn.class);
    }

    private OrderDtoOut convertToDtoOut(Order order) {
        return modelMapper.map(order, OrderDtoOut.class);
    }

    public List<OrderDtoOut> findAllOrders() {
        return orderService.findAll()
                .stream()
                .map(this::convertToDtoOut)
                .collect(Collectors.toList());
    }

    public List<OrderDtoOut> findOrderByEmail(String email) {
        return orderService.findOrderByEmail(email)
                .stream()
                .map(this::convertToDtoOut)
                .collect(Collectors.toList());
    }

    public Long finalizeOrder() {
        return orderService.finalizeOrder();
    }

    public OrderDtoIn postOrder(OrderDtoIn orderDtoIn) {
        return convertToDtoIn(orderService.postOrder(convertToEntity(orderDtoIn), orderDtoIn.getPerfumesId()));
    }
}

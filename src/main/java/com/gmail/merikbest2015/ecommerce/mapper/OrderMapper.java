package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.dto.OrderDto;
import com.gmail.merikbest2015.ecommerce.dto.UserDto;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    private final ModelMapper modelMapper;
    private final UserMapper userMapper;
    private final OrderService orderService;

    public OrderMapper(ModelMapper modelMapper, UserMapper userMapper, OrderService orderService) {
        this.modelMapper = modelMapper;
        this.userMapper = userMapper;
        this.orderService = orderService;
    }

    private Order convertToEntity(OrderDto orderDto) {
        return modelMapper.map(orderDto, Order.class);
    }

    private OrderDto convertToDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }

    public List<OrderDto> findAll() {
        return orderService.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<OrderDto> findOrderByUser(UserDto userDto) {
        return orderService.findOrderByUser(userMapper.convertToEntity(userDto))
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OrderDto postOrder(OrderDto orderDto, String email) {
        return convertToDto(orderService.postOrder(convertToEntity(orderDto), email));
    }

    public OrderDto save(OrderDto orderDto) {
        return convertToDto(orderService.save(convertToEntity(orderDto)));
    }
}

package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertToEntity() {
        OrderRequestDto orderRequestDto = new OrderRequestDto();
        orderRequestDto.setFirstName(FIRST_NAME);
        orderRequestDto.setLastName(LAST_NAME);
        orderRequestDto.setCity(CITY);
        orderRequestDto.setAddress(ADDRESS);
        orderRequestDto.setEmail(ORDER_EMAIL);
        orderRequestDto.setPostIndex(POST_INDEX);
        orderRequestDto.setPhoneNumber(PHONE_NUMBER);
        orderRequestDto.setTotalPrice(TOTAL_PRICE);

        Order order = modelMapper.map(orderRequestDto, Order.class);
        assertEquals(orderRequestDto.getFirstName(), order.getFirstName());
        assertEquals(orderRequestDto.getLastName(), order.getLastName());
        assertEquals(orderRequestDto.getAddress(), order.getAddress());
        assertEquals(orderRequestDto.getCity(), order.getCity());
        assertEquals(orderRequestDto.getEmail(), order.getEmail());
        assertEquals(orderRequestDto.getPostIndex(), order.getPostIndex());
        assertEquals(orderRequestDto.getPhoneNumber(), order.getPhoneNumber());
        assertEquals(orderRequestDto.getTotalPrice(), order.getTotalPrice());
    }

    @Test
    public void convertToResponseDto() {
        Order order = new Order();
        order.setId(1L);
        order.setFirstName(FIRST_NAME);
        order.setLastName(LAST_NAME);
        order.setCity(CITY);
        order.setAddress(ADDRESS);
        order.setEmail(ORDER_EMAIL);
        order.setPostIndex(POST_INDEX);
        order.setPhoneNumber(PHONE_NUMBER);
        order.setTotalPrice(TOTAL_PRICE);

        OrderResponseDto orderResponseDto = modelMapper.map(order, OrderResponseDto.class);
        assertEquals(order.getId(), orderResponseDto.getId());
        assertEquals(order.getFirstName(), orderResponseDto.getFirstName());
        assertEquals(order.getLastName(), orderResponseDto.getLastName());
        assertEquals(order.getAddress(), orderResponseDto.getAddress());
        assertEquals(order.getCity(), orderResponseDto.getCity());
        assertEquals(order.getEmail(), orderResponseDto.getEmail());
        assertEquals(order.getPostIndex(), orderResponseDto.getPostIndex());
        assertEquals(order.getPhoneNumber(), orderResponseDto.getPhoneNumber());
        assertEquals(order.getTotalPrice(), orderResponseDto.getTotalPrice());
    }
}

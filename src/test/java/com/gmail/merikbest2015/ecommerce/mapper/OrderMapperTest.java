package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderDtoOut;
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
        OrderDtoIn orderDtoIn = new OrderDtoIn();
        orderDtoIn.setFirstName(FIRST_NAME);
        orderDtoIn.setLastName(LAST_NAME);
        orderDtoIn.setCity(CITY);
        orderDtoIn.setAddress(ADDRESS);
        orderDtoIn.setEmail(ORDER_EMAIL);
        orderDtoIn.setPostIndex(POST_INDEX);
        orderDtoIn.setPhoneNumber(PHONE_NUMBER);
        orderDtoIn.setTotalPrice(TOTAL_PRICE);

        Order order = modelMapper.map(orderDtoIn, Order.class);
        assertEquals(orderDtoIn.getFirstName(), order.getFirstName());
        assertEquals(orderDtoIn.getLastName(), order.getLastName());
        assertEquals(orderDtoIn.getAddress(), order.getAddress());
        assertEquals(orderDtoIn.getCity(), order.getCity());
        assertEquals(orderDtoIn.getEmail(), order.getEmail());
        assertEquals(orderDtoIn.getPostIndex(), order.getPostIndex());
        assertEquals(orderDtoIn.getPhoneNumber(), order.getPhoneNumber());
        assertEquals(orderDtoIn.getTotalPrice(), order.getTotalPrice());
    }

    @Test
    public void convertToDtoIn() {
        Order order = new Order();
        order.setFirstName(FIRST_NAME);
        order.setLastName(LAST_NAME);
        order.setCity(CITY);
        order.setAddress(ADDRESS);
        order.setEmail(ORDER_EMAIL);
        order.setPostIndex(POST_INDEX);
        order.setPhoneNumber(PHONE_NUMBER);
        order.setTotalPrice(TOTAL_PRICE);

        OrderDtoIn orderDtoIn = modelMapper.map(order, OrderDtoIn.class);
        assertEquals(order.getFirstName(), orderDtoIn.getFirstName());
        assertEquals(order.getLastName(), orderDtoIn.getLastName());
        assertEquals(order.getAddress(), orderDtoIn.getAddress());
        assertEquals(order.getCity(), orderDtoIn.getCity());
        assertEquals(order.getEmail(), orderDtoIn.getEmail());
        assertEquals(order.getPostIndex(), orderDtoIn.getPostIndex());
        assertEquals(order.getPhoneNumber(), orderDtoIn.getPhoneNumber());
        assertEquals(order.getTotalPrice(), orderDtoIn.getTotalPrice());
    }

    @Test
    public void convertToDtoOut() {
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

        OrderDtoOut orderDtoOut = modelMapper.map(order, OrderDtoOut.class);
        assertEquals(order.getId(), orderDtoOut.getId());
        assertEquals(order.getFirstName(), orderDtoOut.getFirstName());
        assertEquals(order.getLastName(), orderDtoOut.getLastName());
        assertEquals(order.getAddress(), orderDtoOut.getAddress());
        assertEquals(order.getCity(), orderDtoOut.getCity());
        assertEquals(order.getEmail(), orderDtoOut.getEmail());
        assertEquals(order.getPostIndex(), orderDtoOut.getPostIndex());
        assertEquals(order.getPhoneNumber(), orderDtoOut.getPhoneNumber());
        assertEquals(order.getTotalPrice(), orderDtoOut.getTotalPrice());
    }
}

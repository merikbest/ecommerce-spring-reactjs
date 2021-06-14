package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequest;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderResponse;
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
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setFirstName(FIRST_NAME);
        orderRequest.setLastName(LAST_NAME);
        orderRequest.setCity(CITY);
        orderRequest.setAddress(ADDRESS);
        orderRequest.setEmail(ORDER_EMAIL);
        orderRequest.setPostIndex(POST_INDEX);
        orderRequest.setPhoneNumber(PHONE_NUMBER);
        orderRequest.setTotalPrice(TOTAL_PRICE);

        Order order = modelMapper.map(orderRequest, Order.class);
        assertEquals(orderRequest.getFirstName(), order.getFirstName());
        assertEquals(orderRequest.getLastName(), order.getLastName());
        assertEquals(orderRequest.getAddress(), order.getAddress());
        assertEquals(orderRequest.getCity(), order.getCity());
        assertEquals(orderRequest.getEmail(), order.getEmail());
        assertEquals(orderRequest.getPostIndex(), order.getPostIndex());
        assertEquals(orderRequest.getPhoneNumber(), order.getPhoneNumber());
        assertEquals(orderRequest.getTotalPrice(), order.getTotalPrice());
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

        OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
        assertEquals(order.getId(), orderResponse.getId());
        assertEquals(order.getFirstName(), orderResponse.getFirstName());
        assertEquals(order.getLastName(), orderResponse.getLastName());
        assertEquals(order.getAddress(), orderResponse.getAddress());
        assertEquals(order.getCity(), orderResponse.getCity());
        assertEquals(order.getEmail(), orderResponse.getEmail());
        assertEquals(order.getPostIndex(), orderResponse.getPostIndex());
        assertEquals(order.getPhoneNumber(), orderResponse.getPhoneNumber());
        assertEquals(order.getTotalPrice(), orderResponse.getTotalPrice());
    }
}

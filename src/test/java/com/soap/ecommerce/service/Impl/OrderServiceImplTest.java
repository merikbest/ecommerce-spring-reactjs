package com.soap.ecommerce.service.Impl;

import com.soap.ecommerce.domain.Order;
import com.soap.ecommerce.domain.OrderItem;
import com.soap.ecommerce.domain.Perfume;
import com.soap.ecommerce.repository.OrderItemRepository;
import com.soap.ecommerce.repository.OrderRepository;
import com.soap.ecommerce.repository.PerfumeRepository;
import com.soap.ecommerce.service.email.MailSender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static com.soap.ecommerce.util.TestConstants.*;
import static com.soap.ecommerce.util.TestConstants.TOTAL_PRICE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderServiceImplTest {

    @Autowired
    private OrderServiceImpl orderService;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private OrderItemRepository orderItemRepository;

    @MockBean
    private PerfumeRepository perfumeRepository;

    @MockBean
    private MailSender mailSender;

    @Test
    public void findAll() {
        List<Order> orderList = new ArrayList<>();
        orderList.add(new Order());
        orderList.add(new Order());

        when(orderRepository.findAllByOrderByIdAsc()).thenReturn(orderList);
        orderService.findAll();
        assertEquals(2, orderList.size());
        verify(orderRepository, times(1)).findAllByOrderByIdAsc();
    }

    @Test
    public void findOrderByEmail() {
        Order order1 = new Order();
        order1.setEmail(ORDER_EMAIL);
        Order order2 = new Order();
        order2.setEmail(ORDER_EMAIL);
        List<Order> orderList = new ArrayList<>();
        orderList.add(order1);
        orderList.add(order2);

        when(orderRepository.findOrderByEmail(ORDER_EMAIL)).thenReturn(orderList);
        orderService.findOrderByEmail(ORDER_EMAIL);
        assertEquals(2, orderList.size());
        verify(orderRepository, times(1)).findOrderByEmail(ORDER_EMAIL);
    }

    @Test
    public void postOrder() {
        Map<Long, Long> perfumesId = new HashMap<>();
        perfumesId.put(1L, 1L);
        perfumesId.put(2L, 1L);

        Perfume perfume1 = new Perfume();
        perfume1.setId(1L);
        perfume1.setPrice(PRICE);
        Perfume perfume2 = new Perfume();
        perfume2.setPrice(PRICE);
        perfume2.setId(2L);

        OrderItem orderItem1 = new OrderItem();
        orderItem1.setPerfume(perfume1);
        orderItem1.setAmount(192L);
        orderItem1.setQuantity(1L);
        OrderItem orderItem2 = new OrderItem();
        orderItem2.setPerfume(perfume2);
        orderItem2.setAmount(192L);
        orderItem2.setQuantity(1L);

        Order order = new Order();
        order.setFirstName(FIRST_NAME);
        order.setLastName(LAST_NAME);
        order.setCity(CITY);
        order.setAddress(ADDRESS);
        order.setEmail(ORDER_EMAIL);
        order.setPostIndex(POST_INDEX);
        order.setPhoneNumber(PHONE_NUMBER);
        order.setTotalPrice(TOTAL_PRICE);
        order.setOrderItems(Arrays.asList(orderItem1, orderItem2));
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);

        when(perfumeRepository.findById(1L)).thenReturn(java.util.Optional.of(perfume1));
        when(perfumeRepository.findById(2L)).thenReturn(java.util.Optional.of(perfume2));
        when(orderItemRepository.save(orderItem1)).thenReturn(orderItem1);
        when(orderItemRepository.save(orderItem2)).thenReturn(orderItem2);
        when(orderRepository.save(order)).thenReturn(order);
        orderService.postOrder(order, perfumesId);
        assertNotNull(order);
        assertEquals(ORDER_EMAIL, order.getEmail());
        assertNotNull(orderItem1);
        assertNotNull(orderItem2);
        verify(mailSender, times(1))
                .sendMessageHtml(
                        ArgumentMatchers.eq(order.getEmail()),
                        ArgumentMatchers.eq("Order #" + order.getId()),
                        ArgumentMatchers.eq("order-template"),
                        ArgumentMatchers.eq(attributes));
    }
}

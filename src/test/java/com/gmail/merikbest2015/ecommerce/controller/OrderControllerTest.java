package com.gmail.merikbest2015.ecommerce.controller;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.repository.OrderRepository;
import com.gmail.merikbest2015.ecommerce.repository.UserRepository;
import com.gmail.merikbest2015.ecommerce.service.OrderService;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private OrderRepository orderRepository;

    @Test
    public void getOrder() throws Exception {
        List<Perfume> perfumes = new ArrayList<>();
        User user = new User();
        Perfume perfume = new Perfume();

        user.setPerfumeList(perfumes);
        user.getPerfumeList().add(perfume);

        assertNotNull(user.getPerfumeList());
        assertEquals(1, user.getPerfumeList().size());
    }

    @Test
    public void addOrder() throws Exception {
        List<Perfume> perfumes = new ArrayList<>();
        Perfume perfume = new Perfume();
        User user = new User();

        user.setPerfumeList(perfumes);
        user.getPerfumeList().add(perfume);

        Order order = new Order(user);
        order.setId(1L);
        order.setFirstName("John");
        order.setPerfumeList(user.getPerfumeList());

        when(userRepository.save(user)).thenReturn(user);
        when(orderRepository.save(order)).thenReturn(order);

        User savedUser = userService.save(user);
        Order savedOrder = orderService.save(order);

        verify(userRepository, times(1)).save(user);
        verify(orderRepository, times(1)).save(order);

        assertEquals(user, savedUser);
        assertEquals(order, savedOrder);

        assertNotNull(user);
        assertNotNull(user.getPerfumeList());
        assertEquals(1, user.getPerfumeList().size());
        assertNotNull(order);
        assertEquals(1L, order.getId());
        assertEquals("John", order.getFirstName());
        assertEquals(1, order.getPerfumeList().size());
    }

    @Test
    public void finalizeOrder() throws Exception {
        List<Perfume> perfumes = new ArrayList<>();
        User user = new User();
        Perfume perfume = new Perfume();
        Order order = new Order(user);

        user.setPerfumeList(perfumes);
        user.getPerfumeList().add(perfume);
        order.setPerfumeList(user.getPerfumeList());

        when(orderRepository.findAll()).thenReturn(Collections.singletonList(order));

        List<Order> orders = orderService.findAll();

        verify(orderRepository, times(1)).findAll();

        assertEquals(Collections.singletonList(order), orders);
        assertNotNull(user);
        assertNotNull(user.getPerfumeList());
        assertEquals(1, user.getPerfumeList().size());
        assertNotNull(order);
        assertEquals(1, order.getPerfumeList().size());
    }

    @Test
    public void getUserOrdersList() {
        User user = new User();
        Order order1 = new Order(user);
        Order order2 = new Order(user);

        when(orderRepository.findOrderByUser(user)).thenReturn(Arrays.asList(order1, order2));

        List<Order> orders = orderService.findOrderByUser(user);

        verify(orderRepository, times(1)).findOrderByUser(user);

        assertEquals(Arrays.asList(order1, order2), orders);
    }
}

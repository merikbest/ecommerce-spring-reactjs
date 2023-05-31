package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequest;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-user-before.sql", "/sql/create-perfumes-before.sql", "/sql/create-orders-before.sql"},
        executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-orders-after.sql", "/sql/create-perfumes-after.sql", "/sql/create-user-after.sql"},
        executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void getOrderById() throws Exception {
        mockMvc.perform(get(API_V1_ORDER + ORDER_ID, 111)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(111))
                .andExpect(jsonPath("$.totalPrice").value(TOTAL_PRICE))
                .andExpect(jsonPath("$.date").value("2021-02-06"))
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.lastName").value(LAST_NAME))
                .andExpect(jsonPath("$.city").value(CITY))
                .andExpect(jsonPath("$.address").value(ADDRESS))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.phoneNumber").value(PHONE_NUMBER))
                .andExpect(jsonPath("$.postIndex").value(POST_INDEX));
    }

    @Test
    public void getOrderById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(API_V1_ORDER + ORDER_ID, 1111)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value(ORDER_NOT_FOUND));
    }

    @Test
    public void getOrderItemsByOrderId() throws Exception {
        mockMvc.perform(get(API_V1_ORDER + ORDER_ID_ITEMS, 111)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].amount").isNotEmpty())
                .andExpect(jsonPath("$[*].quantity").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserOrders() throws Exception {
        mockMvc.perform(get(API_V1_ORDER)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].totalPrice", hasItem(TOTAL_PRICE)))
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].firstName", hasItem(FIRST_NAME)))
                .andExpect(jsonPath("$[*].lastName", hasItem(LAST_NAME)))
                .andExpect(jsonPath("$[*].city", hasItem(CITY)))
                .andExpect(jsonPath("$[*].address", hasItem(ADDRESS)))
                .andExpect(jsonPath("$[*].email", hasItem(USER_EMAIL)))
                .andExpect(jsonPath("$[*].phoneNumber", hasItem(PHONE_NUMBER)))
                .andExpect(jsonPath("$[*].postIndex", hasItem(POST_INDEX)));
    }

    @Test
    public void postOrder() throws Exception {
        Map<Long, Long> perfumesId = new HashMap<>();
        perfumesId.put(2L, 1L);
        perfumesId.put(4L, 1L);

        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setFirstName(FIRST_NAME);
        orderRequest.setLastName(LAST_NAME);
        orderRequest.setCity(CITY);
        orderRequest.setAddress(ADDRESS);
        orderRequest.setEmail(ORDER_EMAIL);
        orderRequest.setPostIndex(POST_INDEX);
        orderRequest.setPhoneNumber(PHONE_NUMBER);
        orderRequest.setTotalPrice(TOTAL_PRICE);
        orderRequest.setPerfumesId(perfumesId);

        mockMvc.perform(post(API_V1_ORDER)
                        .content(mapper.writeValueAsString(orderRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.lastName").value(LAST_NAME))
                .andExpect(jsonPath("$.city").value(CITY))
                .andExpect(jsonPath("$.address").value(ADDRESS))
                .andExpect(jsonPath("$.email").value(ORDER_EMAIL))
                .andExpect(jsonPath("$.phoneNumber").value(PHONE_NUMBER))
                .andExpect(jsonPath("$.postIndex").value(POST_INDEX))
                .andExpect(jsonPath("$.totalPrice").value(TOTAL_PRICE));
    }

    @Test
    public void postOrder_ShouldInputFieldsAreEmpty() throws Exception {
        OrderRequest OrderRequest = new OrderRequest();

        mockMvc.perform(post(API_V1_ORDER)
                        .content(mapper.writeValueAsString(OrderRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.firstNameError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.lastNameError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.cityError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.addressError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.emailError", is(EMAIL_CANNOT_BE_EMPTY)))
                .andExpect(jsonPath("$.phoneNumberError", is(EMPTY_PHONE_NUMBER)))
                .andExpect(jsonPath("$.postIndexError", is(EMPTY_POST_INDEX)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserOrdersByQuery() throws Exception {
        GraphQLRequest graphQLRequest = new GraphQLRequest();
        graphQLRequest.setQuery(GRAPHQL_QUERY_ORDERS);

        mockMvc.perform(post(API_V1_ORDER + GRAPHQL)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.orders[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].totalPrice", hasItem(TOTAL_PRICE)))
                .andExpect(jsonPath("$.data.orders[*].date").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].firstName", hasItem(FIRST_NAME)))
                .andExpect(jsonPath("$.data.orders[*].lastName", hasItem(LAST_NAME)))
                .andExpect(jsonPath("$.data.orders[*].city", hasItem(CITY)))
                .andExpect(jsonPath("$.data.orders[*].address", hasItem(ADDRESS)))
                .andExpect(jsonPath("$.data.orders[*].email", hasItem(USER_EMAIL)))
                .andExpect(jsonPath("$.data.orders[*].phoneNumber", hasItem(PHONE_NUMBER)))
                .andExpect(jsonPath("$.data.orders[*].postIndex", hasItem(POST_INDEX)))
                .andExpect(jsonPath("$.data.orders[*].orderItems").isNotEmpty());
    }
}

package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.order.OrderRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.collection.IsIterableWithSize.iterableWithSize;
import static org.hamcrest.number.OrderingComparison.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-user-before.sql", "/sql/create-perfumes-before.sql", "/sql/create-orders-before.sql"},
        executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-orders-after.sql", "/sql/create-perfumes-after.sql", "/sql/create-user-after.sql"},
        executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserInfo() throws Exception {
        mockMvc.perform(get(URL_USERS_BASIC + "/info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.roles").value(ROLE_USER));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserInfoByQuery() throws Exception {
        GraphQLRequestDto graphQLRequestDto = new GraphQLRequestDto();
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_USER);

        mockMvc.perform(post(URL_USERS_GRAPHQL + "/info")
                .content(mapper.writeValueAsString(graphQLRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.id", equalTo(USER_ID)))
                .andExpect(jsonPath("$.data.user.email", equalTo(USER_EMAIL)))
                .andExpect(jsonPath("$.data.user.firstName", equalTo(FIRST_NAME)))
                .andExpect(jsonPath("$.data.user.lastName", equalTo(LAST_NAME)))
                .andExpect(jsonPath("$.data.user.city", equalTo(CITY)))
                .andExpect(jsonPath("$.data.user.address", equalTo(ADDRESS)))
                .andExpect(jsonPath("$.data.user.phoneNumber", equalTo(PHONE_NUMBER)))
                .andExpect(jsonPath("$.data.user.postIndex", equalTo("1234567890")))
                .andExpect(jsonPath("$.data.user.activationCode", equalTo(null)))
                .andExpect(jsonPath("$.data.user.passwordResetCode", equalTo(null)))
                .andExpect(jsonPath("$.data.user.active", equalTo(true)))
                .andExpect(jsonPath("$.data.user.roles[0]", equalTo(ROLE_USER)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateUserInfo() throws Exception {
        UserRequestDto userRequestDto = new UserRequestDto();
        userRequestDto.setFirstName(USER2_NAME);
        userRequestDto.setLastName(USER2_NAME);

        mockMvc.perform(put(URL_USERS_BASIC + "/edit")
                .content(mapper.writeValueAsString(userRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.firstName").value(USER2_NAME))
                .andExpect(jsonPath("$.lastName").value(USER2_NAME));
    }

    @Test
    public void getCart() throws Exception {
        List<Long> perfumesIds = new ArrayList<>();
        perfumesIds.add(2L);
        perfumesIds.add(4L);

        mockMvc.perform(post(URL_USERS_BASIC + "/cart")
                .content(mapper.writeValueAsString(perfumesIds))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumer").isNotEmpty())
                .andExpect(jsonPath("$[*].year").isNotEmpty())
                .andExpect(jsonPath("$[*].country").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeGender").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceTopNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceMiddleNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].fragranceBaseNotes").isNotEmpty())
                .andExpect(jsonPath("$[*].description").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty())
                .andExpect(jsonPath("$[*].volume").isNotEmpty())
                .andExpect(jsonPath("$[*].type").isNotEmpty())
                .andExpect(jsonPath("$[*].reviews[*]", iterableWithSize(greaterThan(1))))
                .andExpect(jsonPath("$[*].reviews[*].author").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserOrders() throws Exception {
        mockMvc.perform(get(URL_USERS_BASIC + "/orders"))
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
                .andExpect(jsonPath("$[*].postIndex", hasItem(POST_INDEX)))
                .andExpect(jsonPath("$[*].orderItems").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserOrdersByQuery() throws Exception {
        GraphQLRequestDto graphQLRequestDto = new GraphQLRequestDto();
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_ORDERS);

        mockMvc.perform(post(URL_USERS_GRAPHQL + "/orders")
                .content(mapper.writeValueAsString(graphQLRequestDto))
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

    @Test
    public void postOrder() throws Exception {
        Map<Long, Long> perfumesId = new HashMap<>();
        perfumesId.put(2L, 1L);
        perfumesId.put(4L, 1L);

        OrderRequestDto orderRequestDto = new OrderRequestDto();
        orderRequestDto.setFirstName(FIRST_NAME);
        orderRequestDto.setLastName(LAST_NAME);
        orderRequestDto.setCity(CITY);
        orderRequestDto.setAddress(ADDRESS);
        orderRequestDto.setEmail(ORDER_EMAIL);
        orderRequestDto.setPostIndex(POST_INDEX);
        orderRequestDto.setPhoneNumber(PHONE_NUMBER);
        orderRequestDto.setTotalPrice(TOTAL_PRICE);
        orderRequestDto.setPerfumesId(perfumesId);

        mockMvc.perform(post(URL_USERS_ORDER)
                .content(mapper.writeValueAsString(orderRequestDto))
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
        OrderRequestDto OrderRequestDto = new OrderRequestDto();

        mockMvc.perform(post(URL_USERS_ORDER)
                .content(mapper.writeValueAsString(OrderRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.firstNameError", is("Fill in the input field")))
                .andExpect(jsonPath("$.lastNameError", is("Fill in the input field")))
                .andExpect(jsonPath("$.cityError", is("Fill in the input field")))
                .andExpect(jsonPath("$.addressError", is("Fill in the input field")))
                .andExpect(jsonPath("$.emailError", is("Email cannot be empty")))
                .andExpect(jsonPath("$.phoneNumberError", is("Phone number cannot be empty")))
                .andExpect(jsonPath("$.postIndexError", is("Post index cannot be empty")));
    }

    @Test
    public void addReviewToPerfume() throws Exception {
        ReviewRequestDto reviewRequestDto = new ReviewRequestDto();
        reviewRequestDto.setPerfumeId(2L);
        reviewRequestDto.setAuthor(FIRST_NAME);
        reviewRequestDto.setMessage("Hello world");
        reviewRequestDto.setRating(5);

        mockMvc.perform(post(URL_USERS_REVIEW)
                .content(mapper.writeValueAsString(reviewRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(2)))
                .andExpect(jsonPath("$.perfumeTitle", equalTo("Boss Bottled Night")))
                .andExpect(jsonPath("$.perfumer", equalTo("Hugo Boss")))
                .andExpect(jsonPath("$.price", equalTo(35)))
                .andExpect(jsonPath("$.reviews[0].author", equalTo(FIRST_NAME)))
                .andExpect(jsonPath("$.reviews[0].message", equalTo("Hello world")));
    }

    @Test
    public void addReviewToPerfume_ShouldInputFieldsAreEmpty() throws Exception {
        ReviewRequestDto reviewRequestDto = new ReviewRequestDto();

        mockMvc.perform(post(URL_USERS_REVIEW)
                .content(mapper.writeValueAsString(reviewRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.authorError", is("Fill in the input field")))
                .andExpect(jsonPath("$.messageError", is("Fill in the input field")));
    }
}

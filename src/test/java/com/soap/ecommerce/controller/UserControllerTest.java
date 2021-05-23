package com.soap.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soap.ecommerce.dto.GraphQLRequestDto;
import com.soap.ecommerce.dto.PasswordResetRequestDto;
import com.soap.ecommerce.dto.order.OrderRequestDto;
import com.soap.ecommerce.dto.review.ReviewRequestDto;
import com.soap.ecommerce.dto.user.UserRequestDto;
import com.soap.ecommerce.security.JwtAuthenticationException;
import com.soap.ecommerce.util.TestConstants;
import org.hamcrest.Matchers;
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void getUserInfo() throws Exception {
        mockMvc.perform(get(TestConstants.URL_USERS_BASIC + "/info"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.firstName").value(TestConstants.FIRST_NAME))
                .andExpect(jsonPath("$.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.roles").value(TestConstants.ROLE_USER));
    }

    @Test
    public void getUserInfoByJwt() throws Exception {
        mockMvc.perform(get(TestConstants.URL_USERS_BASIC + "/info").header("Authorization", TestConstants.JWT_TOKEN))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.email").value(TestConstants.ADMIN_EMAIL))
                .andExpect(jsonPath("$.roles").value(TestConstants.ROLE_ADMIN));
    }

    @Test(expected = JwtAuthenticationException.class)
    public void getUserInfoByJwtExpired() throws Exception {
        mockMvc.perform(get(TestConstants.URL_USERS_BASIC + "/info").header("Authorization", "jwt"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void getUserInfoByQuery() throws Exception {
        GraphQLRequestDto graphQLRequestDto = new GraphQLRequestDto();
        graphQLRequestDto.setQuery(TestConstants.GRAPHQL_QUERY_USER);

        mockMvc.perform(post(TestConstants.URL_USERS_GRAPHQL + "/info")
                .content(mapper.writeValueAsString(graphQLRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.user.id", equalTo(TestConstants.USER_ID)))
                .andExpect(jsonPath("$.data.user.email", equalTo(TestConstants.USER_EMAIL)))
                .andExpect(jsonPath("$.data.user.firstName", equalTo(TestConstants.FIRST_NAME)))
                .andExpect(jsonPath("$.data.user.lastName", equalTo(TestConstants.LAST_NAME)))
                .andExpect(jsonPath("$.data.user.city", equalTo(TestConstants.CITY)))
                .andExpect(jsonPath("$.data.user.address", equalTo(TestConstants.ADDRESS)))
                .andExpect(jsonPath("$.data.user.phoneNumber", equalTo(TestConstants.PHONE_NUMBER)))
                .andExpect(jsonPath("$.data.user.postIndex", equalTo("1234567890")))
                .andExpect(jsonPath("$.data.user.activationCode", equalTo(null)))
                .andExpect(jsonPath("$.data.user.passwordResetCode", equalTo(null)))
                .andExpect(jsonPath("$.data.user.active", equalTo(true)))
                .andExpect(jsonPath("$.data.user.roles[0]", equalTo(TestConstants.ROLE_USER)));
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void updateUserInfo() throws Exception {
        UserRequestDto userRequestDto = new UserRequestDto();
        userRequestDto.setFirstName(TestConstants.USER2_NAME);
        userRequestDto.setLastName(TestConstants.USER2_NAME);

        mockMvc.perform(put(TestConstants.URL_USERS_BASIC + "/edit")
                .content(mapper.writeValueAsString(userRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.email").value(TestConstants.USER_EMAIL))
                .andExpect(jsonPath("$.firstName").value(TestConstants.USER2_NAME))
                .andExpect(jsonPath("$.lastName").value(TestConstants.USER2_NAME));
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void updateUserInfo_ShouldInputFieldsAreEmpty() throws Exception {
        UserRequestDto userRequestDto = new UserRequestDto();

        mockMvc.perform(put(TestConstants.URL_USERS_BASIC + "/edit")
                .content(mapper.writeValueAsString(userRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.firstNameError", is("First name cannot be empty")))
                .andExpect(jsonPath("$.lastNameError", is("Last name cannot be empty")));
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void updateUserPassword() throws Exception {
        PasswordResetRequestDto requestDto = new PasswordResetRequestDto();
        requestDto.setPassword(TestConstants.USER_PASSWORD);
        requestDto.setPassword2(TestConstants.USER_PASSWORD);

        mockMvc.perform(put(TestConstants.URL_USERS_BASIC + "/edit/password")
                .content(mapper.writeValueAsString(requestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Password successfully changed!")));
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void updateUserPassword_ShouldPasswordsNotMatch() throws Exception {
        PasswordResetRequestDto requestDto = new PasswordResetRequestDto();
        requestDto.setPassword(TestConstants.USER_PASSWORD);
        requestDto.setPassword2("testpassword");

        mockMvc.perform(put(TestConstants.URL_USERS_BASIC + "/edit/password")
                .content(mapper.writeValueAsString(requestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("Passwords do not match.")));
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void updateUserPassword_ShouldInputFieldsAreEmpty() throws Exception {
        PasswordResetRequestDto requestDto = new PasswordResetRequestDto();
        requestDto.setPassword("");
        requestDto.setPassword2("");

        mockMvc.perform(put(TestConstants.URL_USERS_BASIC + "/edit/password")
                .content(mapper.writeValueAsString(requestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("The password must be between 6 and 16 characters long")))
                .andExpect(jsonPath("$.password2Error", is("The password confirmation must be between 6 and 16 characters long")));
    }

    @Test
    public void getCart() throws Exception {
        List<Long> perfumesIds = new ArrayList<>();
        perfumesIds.add(2L);
        perfumesIds.add(4L);

        mockMvc.perform(post(TestConstants.URL_USERS_BASIC + "/cart")
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
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void getUserOrders() throws Exception {
        mockMvc.perform(get(TestConstants.URL_USERS_BASIC + "/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].totalPrice", Matchers.hasItem(TestConstants.TOTAL_PRICE)))
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].firstName", Matchers.hasItem(TestConstants.FIRST_NAME)))
                .andExpect(jsonPath("$[*].lastName", Matchers.hasItem(TestConstants.LAST_NAME)))
                .andExpect(jsonPath("$[*].city", Matchers.hasItem(TestConstants.CITY)))
                .andExpect(jsonPath("$[*].address", Matchers.hasItem(TestConstants.ADDRESS)))
                .andExpect(jsonPath("$[*].email", Matchers.hasItem(TestConstants.USER_EMAIL)))
                .andExpect(jsonPath("$[*].phoneNumber", Matchers.hasItem(TestConstants.PHONE_NUMBER)))
                .andExpect(jsonPath("$[*].postIndex", Matchers.hasItem(TestConstants.POST_INDEX)))
                .andExpect(jsonPath("$[*].orderItems").isNotEmpty());
    }

    @Test
    @WithUserDetails(TestConstants.USER_EMAIL)
    public void getUserOrdersByQuery() throws Exception {
        GraphQLRequestDto graphQLRequestDto = new GraphQLRequestDto();
        graphQLRequestDto.setQuery(TestConstants.GRAPHQL_QUERY_ORDERS);

        mockMvc.perform(post(TestConstants.URL_USERS_GRAPHQL + "/orders")
                .content(mapper.writeValueAsString(graphQLRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.orders[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].totalPrice", Matchers.hasItem(TestConstants.TOTAL_PRICE)))
                .andExpect(jsonPath("$.data.orders[*].date").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].firstName", Matchers.hasItem(TestConstants.FIRST_NAME)))
                .andExpect(jsonPath("$.data.orders[*].lastName", Matchers.hasItem(TestConstants.LAST_NAME)))
                .andExpect(jsonPath("$.data.orders[*].city", Matchers.hasItem(TestConstants.CITY)))
                .andExpect(jsonPath("$.data.orders[*].address", Matchers.hasItem(TestConstants.ADDRESS)))
                .andExpect(jsonPath("$.data.orders[*].email", Matchers.hasItem(TestConstants.USER_EMAIL)))
                .andExpect(jsonPath("$.data.orders[*].phoneNumber", Matchers.hasItem(TestConstants.PHONE_NUMBER)))
                .andExpect(jsonPath("$.data.orders[*].postIndex", Matchers.hasItem(TestConstants.POST_INDEX)))
                .andExpect(jsonPath("$.data.orders[*].orderItems").isNotEmpty());
    }

    @Test
    public void postOrder() throws Exception {
        Map<Long, Long> perfumesId = new HashMap<>();
        perfumesId.put(2L, 1L);
        perfumesId.put(4L, 1L);

        OrderRequestDto orderRequestDto = new OrderRequestDto();
        orderRequestDto.setFirstName(TestConstants.FIRST_NAME);
        orderRequestDto.setLastName(TestConstants.LAST_NAME);
        orderRequestDto.setCity(TestConstants.CITY);
        orderRequestDto.setAddress(TestConstants.ADDRESS);
        orderRequestDto.setEmail(TestConstants.ORDER_EMAIL);
        orderRequestDto.setPostIndex(TestConstants.POST_INDEX);
        orderRequestDto.setPhoneNumber(TestConstants.PHONE_NUMBER);
        orderRequestDto.setTotalPrice(TestConstants.TOTAL_PRICE);
        orderRequestDto.setPerfumesId(perfumesId);

        mockMvc.perform(MockMvcRequestBuilders.post(TestConstants.URL_USERS_ORDER)
                .content(mapper.writeValueAsString(orderRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(TestConstants.FIRST_NAME))
                .andExpect(jsonPath("$.lastName").value(TestConstants.LAST_NAME))
                .andExpect(jsonPath("$.city").value(TestConstants.CITY))
                .andExpect(jsonPath("$.address").value(TestConstants.ADDRESS))
                .andExpect(jsonPath("$.email").value(TestConstants.ORDER_EMAIL))
                .andExpect(jsonPath("$.phoneNumber").value(TestConstants.PHONE_NUMBER))
                .andExpect(jsonPath("$.postIndex").value(TestConstants.POST_INDEX))
                .andExpect(jsonPath("$.totalPrice").value(TestConstants.TOTAL_PRICE));
    }

    @Test
    public void postOrder_ShouldInputFieldsAreEmpty() throws Exception {
        OrderRequestDto OrderRequestDto = new OrderRequestDto();

        mockMvc.perform(MockMvcRequestBuilders.post(TestConstants.URL_USERS_ORDER)
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
        reviewRequestDto.setAuthor(TestConstants.FIRST_NAME);
        reviewRequestDto.setMessage("Hello world");
        reviewRequestDto.setRating(5);

        mockMvc.perform(MockMvcRequestBuilders.post(TestConstants.URL_USERS_REVIEW)
                .content(mapper.writeValueAsString(reviewRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(2)))
                .andExpect(jsonPath("$.perfumeTitle", equalTo("Boss Bottled Night")))
                .andExpect(jsonPath("$.perfumer", equalTo("Hugo Boss")))
                .andExpect(jsonPath("$.price", equalTo(35)))
                .andExpect(jsonPath("$.reviews[0].author", equalTo(TestConstants.FIRST_NAME)))
                .andExpect(jsonPath("$.reviews[0].message", equalTo("Hello world")));
    }

    @Test
    public void addReviewToPerfume_ShouldInputFieldsAreEmpty() throws Exception {
        ReviewRequestDto reviewRequestDto = new ReviewRequestDto();

        mockMvc.perform(MockMvcRequestBuilders.post(TestConstants.URL_USERS_REVIEW)
                .content(mapper.writeValueAsString(reviewRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.authorError", is("Fill in the input field")))
                .andExpect(jsonPath("$.messageError", is("Fill in the input field")));
    }
}

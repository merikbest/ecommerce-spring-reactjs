package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequest;
import com.gmail.merikbest2015.ecommerce.dto.user.UpdateUserRequest;
import com.gmail.merikbest2015.ecommerce.security.JwtAuthenticationException;
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
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.EMPTY_FIRST_NAME;
import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.EMPTY_LAST_NAME;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-user-before.sql", "/sql/create-perfumes-before.sql"},
        executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-user-after.sql", "/sql/create-perfumes-after.sql"},
        executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserInfo() throws Exception {
        mockMvc.perform(get(API_V1_USERS)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.roles").value(ROLE_USER));
    }

    @Test
    public void getUserInfoByJwt() throws Exception {
        mockMvc.perform(get(API_V1_USERS)
                        .header("Authorization", JWT_TOKEN)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.email").value(ADMIN_EMAIL))
                .andExpect(jsonPath("$.roles").value(ROLE_ADMIN));
    }

    @Test(expected = JwtAuthenticationException.class)
    public void getUserInfoByJwtExpired() throws Exception {
        mockMvc.perform(get(API_V1_USERS)
                        .header("Authorization", "jwt")
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateUserInfo() throws Exception {
        UpdateUserRequest userRequest = new UpdateUserRequest();
        userRequest.setFirstName(USER2_NAME);
        userRequest.setLastName(USER2_NAME);

        mockMvc.perform(put(API_V1_USERS)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.firstName").value(USER2_NAME))
                .andExpect(jsonPath("$.lastName").value(USER2_NAME));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void updateUserInfo_ShouldInputFieldsAreEmpty() throws Exception {
        UpdateUserRequest userRequest = new UpdateUserRequest();

        mockMvc.perform(put(API_V1_USERS)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.firstNameError", is(EMPTY_FIRST_NAME)))
                .andExpect(jsonPath("$.lastNameError", is(EMPTY_LAST_NAME)));
    }

    @Test
    public void getCart() throws Exception {
        List<Long> perfumesIds = new ArrayList<>();
        perfumesIds.add(2L);
        perfumesIds.add(4L);

        mockMvc.perform(post(API_V1_USERS + CART)
                        .content(mapper.writeValueAsString(perfumesIds))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumer").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty())
                .andExpect(jsonPath("$[*].volume").isNotEmpty())
                .andExpect(jsonPath("$[*].perfumeRating").isNotEmpty())
                .andExpect(jsonPath("$[*].reviewsCount").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserInfoByQuery() throws Exception {
        GraphQLRequest graphQLRequest = new GraphQLRequest();
        graphQLRequest.setQuery(GRAPHQL_QUERY_USER);

        mockMvc.perform(post(API_V1_USERS + GRAPHQL)
                        .content(mapper.writeValueAsString(graphQLRequest))
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
}

package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequest;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequest;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.File;
import java.io.FileInputStream;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@WithUserDetails(ADMIN_EMAIL)
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-user-before.sql", "/sql/create-perfumes-before.sql", "/sql/create-orders-before.sql"},
        executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-orders-after.sql", "/sql/create-perfumes-after.sql", "/sql/create-user-after.sql"},
        executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private GraphQLRequest graphQLRequest;
    private PerfumeRequest perfumeRequest;

    @Before
    public void init() {
        graphQLRequest = new GraphQLRequest();
        perfumeRequest = new PerfumeRequest();
        perfumeRequest.setPerfumer(PERFUMER_CHANEL);
        perfumeRequest.setPerfumeTitle(PERFUME_TITLE);
        perfumeRequest.setYear(YEAR);
        perfumeRequest.setCountry(COUNTRY);
        perfumeRequest.setPerfumeGender(PERFUME_GENDER);
        perfumeRequest.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfumeRequest.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfumeRequest.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfumeRequest.setPrice(PRICE);
        perfumeRequest.setVolume(VOLUME);
        perfumeRequest.setType(TYPE);
    }

    @Test
    @DisplayName("[200] POST /api/v1/admin/add - Add Perfume")
    public void addPerfume() throws Exception {
        FileInputStream inputFile = new FileInputStream(new File(FILE_PATH));
        MockMultipartFile multipartFile = new MockMultipartFile("file", FILE_NAME, MediaType.MULTIPART_FORM_DATA_VALUE, inputFile);
        MockMultipartFile jsonFile = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequest).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(multipart(API_V1_ADMIN + ADD)
                        .file(multipartFile)
                        .file(jsonFile))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[400] POST /api/v1/admin/add - Should Input Fields Are Empty Add Perfume")
    public void addPerfume_ShouldInputFieldsAreEmpty() throws Exception {
        PerfumeRequest perfumeRequest = new PerfumeRequest();
        MockMultipartFile jsonFile = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequest).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(multipart(API_V1_ADMIN + ADD)
                        .file(jsonFile)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.perfumeTitleError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.perfumerError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.yearError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.countryError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.perfumeGenderError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceTopNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceMiddleNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceBaseNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.priceError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.volumeError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.typeError", is(FILL_IN_THE_INPUT_FIELD)));
    }

    @Test
    @DisplayName("[200] POST /api/v1/admin/edit - Edit Perfume")
    public void editPerfume() throws Exception {
        FileInputStream inputFile = new FileInputStream(new File(FILE_PATH));
        MockMultipartFile multipartFile = new MockMultipartFile("file", FILE_NAME, MediaType.MULTIPART_FORM_DATA_VALUE, inputFile);
        MockMultipartFile jsonFileEdit = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequest).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        perfumeRequest.setType("test");
        mockMvc.perform(multipart(API_V1_ADMIN + EDIT)
                        .file(multipartFile)
                        .file(jsonFileEdit))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[400] POST /api/v1/admin/edit - Should Input Fields Are Empty Edit Perfume")
    public void editPerfume_ShouldInputFieldsAreEmpty() throws Exception {
        PerfumeRequest perfumeRequest = new PerfumeRequest();
        MockMultipartFile jsonFile = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequest).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(multipart(API_V1_ADMIN + EDIT)
                        .file(jsonFile)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.perfumeTitleError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.perfumerError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.yearError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.countryError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.perfumeGenderError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceTopNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceMiddleNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.fragranceBaseNotesError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.priceError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.volumeError", is(FILL_IN_THE_INPUT_FIELD)))
                .andExpect(jsonPath("$.typeError", is(FILL_IN_THE_INPUT_FIELD)));
    }

    @Test
    @DisplayName("[200] DELETE /api/v1/admin/delete/46 - Delete Perfume")
    public void deletePerfume() throws Exception {
        mockMvc.perform(delete(API_V1_ADMIN + DELETE_BY_PERFUME_ID, 46)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Perfume deleted successfully")));
    }

    @Test
    @DisplayName("[404] DELETE /api/v1/admin/delete/99 - Delete Perfume Should Not Found")
    public void deletePerfume_ShouldNotFound() throws Exception {
        mockMvc.perform(delete(API_V1_ADMIN + DELETE_BY_PERFUME_ID, 99)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(PERFUME_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/admin/orders - Get All Orders")
    public void getAllOrders() throws Exception {
        mockMvc.perform(get(API_V1_ADMIN + ORDERS)
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
    @DisplayName("[200] GET /api/v1/admin/order/test123@test.com - Get User Orders By Email")
    public void getUserOrdersByEmail() throws Exception {
        mockMvc.perform(get(API_V1_ADMIN + ORDER_BY_EMAIL, USER_EMAIL)
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
    @DisplayName("[200] DELETE /api/v1/admin/order/delete/111 - Delete Order")
    public void deleteOrder() throws Exception {
        mockMvc.perform(delete(API_V1_ADMIN + ORDER_DELETE, 111)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Order deleted successfully")));
    }

    @Test
    @DisplayName("[404] DELETE /api/v1/admin/order/delete/222 - Delete Order Should Not Found")
    public void deleteOrder_ShouldNotFound() throws Exception {
        mockMvc.perform(delete(API_V1_ADMIN + ORDER_DELETE, 222)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is(ORDER_NOT_FOUND)));
    }

    @Test
    @DisplayName("[200] GET /api/v1/admin/user/122 - Get User by Id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(API_V1_ADMIN + USER_BY_ID, USER_ID)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.email").value(USER_EMAIL));
    }

    @Test
    @DisplayName("[404] GET /api/v1/admin/user/1222 - Should Not Found Get User by Id")
    public void getUserById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(API_V1_ADMIN + USER_BY_ID, 1222)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$").value(USER_NOT_FOUND));
    }

    @Test
    @DisplayName("[200] GET /api/v1/admin/user/all - Get All Users")
    public void getAllUsers() throws Exception {
        mockMvc.perform(get(API_V1_ADMIN + USER_ALL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id", hasItem(USER_ID)))
                .andExpect(jsonPath("$[*].firstName", hasItem(FIRST_NAME)))
                .andExpect(jsonPath("$[*].email", hasItem(USER_EMAIL)));
    }

    @Test
    @DisplayName("[200] POST /api/v1/admin/graphql/user - Get User By Query")
    public void getUserByQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_USER);

        mockMvc.perform(post(API_V1_ADMIN + GRAPHQL_USER)
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

    @Test
    @DisplayName("[200] POST /api/v1/admin/graphql/user/all - Get Users By Query")
    public void getUsersByQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_USERS);

        mockMvc.perform(post(API_V1_ADMIN + GRAPHQL_USER_ALL)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.users[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].email").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].firstName").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].lastName").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].city").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].address").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].phoneNumber").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].postIndex").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].activationCode").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].passwordResetCode").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].active").isNotEmpty())
                .andExpect(jsonPath("$.data.users[*].roles").isNotEmpty());
    }

    @Test
    @DisplayName("[200] POST /api/v1/admin/graphql/orders - Get Orders By Query")
    public void getOrdersByQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_ORDERS);

        mockMvc.perform(post(API_V1_ADMIN + GRAPHQL_ORDERS)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.orders[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].totalPrice").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].date").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].firstName").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].lastName").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].city").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].address").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].email").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].phoneNumber").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].postIndex").isNotEmpty())
                .andExpect(jsonPath("$.data.orders[*].orderItems[*].perfume").isNotEmpty());
    }

    @Test
    @DisplayName("[200] POST /api/v1/admin/graphql/order - Get User Orders By Email Query")
    public void getUserOrdersByEmailQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_ORDERS_BY_EMAIL);

        mockMvc.perform(post(API_V1_ADMIN + GRAPHQL_ORDER)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.ordersByEmail[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].totalPrice").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].date").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].firstName").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].lastName").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].city").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].address").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].email").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].phoneNumber").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].postIndex").isNotEmpty())
                .andExpect(jsonPath("$.data.ordersByEmail[*].orderItems[*].perfume").isNotEmpty());
    }
}

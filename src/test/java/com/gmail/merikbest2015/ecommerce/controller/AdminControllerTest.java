package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.perfume.PerfumeRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.user.UserRequestDto;
import org.junit.Before;
import org.junit.Test;
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

import java.io.FileInputStream;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.collection.IsIterableWithSize.iterableWithSize;
import static org.hamcrest.number.OrderingComparison.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    private GraphQLRequestDto graphQLRequestDto;
    private PerfumeRequestDto perfumeRequestDto;

    @Before
    public void init() {
        graphQLRequestDto = new GraphQLRequestDto();
        perfumeRequestDto = new PerfumeRequestDto();
        perfumeRequestDto.setPerfumer(PERFUMER_CHANEL);
        perfumeRequestDto.setPerfumeTitle(PERFUME_TITLE);
        perfumeRequestDto.setYear(YEAR);
        perfumeRequestDto.setCountry(COUNTRY);
        perfumeRequestDto.setPerfumeGender(PERFUME_GENDER);
        perfumeRequestDto.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        perfumeRequestDto.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        perfumeRequestDto.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        perfumeRequestDto.setPrice(PRICE);
        perfumeRequestDto.setVolume(VOLUME);
        perfumeRequestDto.setType(TYPE);
    }

    @Test
    public void addPerfume() throws Exception {
        FileInputStream inputFile = new FileInputStream(FILE_PATH);
        MockMultipartFile multipartFile = new MockMultipartFile("file", FILE_NAME, MediaType.MULTIPART_FORM_DATA_VALUE, inputFile);
        MockMultipartFile jsonFile = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequestDto).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(multipart(URL_ADMIN_ADD)
                .file(multipartFile)
                .file(jsonFile))
                .andExpect(status().isOk());
    }

    @Test
    public void addPerfume_ShouldInputFieldsAreEmpty() throws Exception {
        PerfumeRequestDto perfumeRequestDto = new PerfumeRequestDto();
        MockMultipartFile jsonFile = new MockMultipartFile("perfume", "", MediaType.APPLICATION_JSON_VALUE, mapper.writeValueAsString(perfumeRequestDto).getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        mockMvc.perform(multipart(URL_ADMIN_ADD)
                .file(jsonFile))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.perfumeTitleError", is("Fill in the input field")))
                .andExpect(jsonPath("$.perfumerError", is("Fill in the input field")))
                .andExpect(jsonPath("$.yearError", is("Fill in the input field")))
                .andExpect(jsonPath("$.countryError", is("Fill in the input field")))
                .andExpect(jsonPath("$.perfumeGenderError", is("Fill in the input field")))
                .andExpect(jsonPath("$.fragranceTopNotesError", is("Fill in the input field")))
                .andExpect(jsonPath("$.fragranceMiddleNotesError", is("Fill in the input field")))
                .andExpect(jsonPath("$.fragranceBaseNotesError", is("Fill in the input field")))
                .andExpect(jsonPath("$.priceError", is("Fill in the input field")))
                .andExpect(jsonPath("$.volumeError", is("Fill in the input field")))
                .andExpect(jsonPath("$.typeError", is("Fill in the input field")));
    }

    @Test
    public void deletePerfume() throws Exception {
        mockMvc.perform(delete(URL_ADMIN_BASIC + "/delete/59"))
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
    public void getAllOrders() throws Exception {
        mockMvc.perform(get(URL_ADMIN_BASIC + "/orders"))
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
    public void getUserOrdersByEmail() throws Exception {
        UserRequestDto userRequestDto = new UserRequestDto();
        userRequestDto.setEmail(USER_EMAIL);

        mockMvc.perform(post(URL_ADMIN_BASIC + "/order")
                .content(mapper.writeValueAsString(userRequestDto))
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
                .andExpect(jsonPath("$[*].postIndex", hasItem(POST_INDEX)))
                .andExpect(jsonPath("$[*].orderItems").isNotEmpty());
    }

    @Test
    public void deleteOrder() throws Exception {
        mockMvc.perform(delete(URL_ADMIN_BASIC + "/order/delete/111"))
                .andExpect(status().isOk());
    }

    @Test
    public void getUser() throws Exception {
        mockMvc.perform(get(URL_ADMIN_GET_USER + USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.firstName").value(FIRST_NAME))
                .andExpect(jsonPath("$.email").value(USER_EMAIL));
    }

    @Test
    public void getAllUsers() throws Exception {
        mockMvc.perform(get(URL_ADMIN_GET_USER + "all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id", hasItem(USER_ID)))
                .andExpect(jsonPath("$[*].firstName", hasItem(FIRST_NAME)))
                .andExpect(jsonPath("$[*].email", hasItem(USER_EMAIL)));
    }

    @Test
    public void getUserByQuery() throws Exception {
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_USER);

        mockMvc.perform(post(URL_ADMIN_GRAPHQL + "/user")
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
    public void getUsersByQuery() throws Exception {
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_USERS);

        mockMvc.perform(post(URL_ADMIN_GRAPHQL + "/user/all")
                .content(mapper.writeValueAsString(graphQLRequestDto))
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
    public void getOrdersByQuery() throws Exception {
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_ORDERS);

        mockMvc.perform(post(URL_ADMIN_GRAPHQL + "/orders")
                .content(mapper.writeValueAsString(graphQLRequestDto))
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
    public void getUserOrdersByEmailQuery() throws Exception {
        graphQLRequestDto.setQuery(GRAPHQL_QUERY_ORDERS_BY_EMAIL);

        mockMvc.perform(post(URL_ADMIN_GRAPHQL + "/order")
                .content(mapper.writeValueAsString(graphQLRequestDto))
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

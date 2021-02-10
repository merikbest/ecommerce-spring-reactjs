package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-user-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-user-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class RegistrationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void registration_ShouldPassword2BeEmpty() throws Exception {
        UserDtoIn userDtoIn = new UserDtoIn();
        userDtoIn.setEmail("testtest@test.com");
        userDtoIn.setUsername(FIRST_NAME);
        userDtoIn.setCaptcha("12345");

        mockMvc.perform(post("/api/v1/registration")
                .param("password2", "")
                .param("g-recaptcha-response", "")
                .content(mapper.writeValueAsString(userDtoIn))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2Error", is("Password confirmation cannot be empty.")));
    }

    @Test
    public void registration_ShouldPasswordsNotMatch() throws Exception {
        UserDtoIn userDtoIn = new UserDtoIn();
        userDtoIn.setEmail("testtest@test.com");
        userDtoIn.setPassword(USER_PASSWORD);
        userDtoIn.setUsername(FIRST_NAME);

        mockMvc.perform(post("/api/v1/registration")
                .param("password2", "12345")
                .param("g-recaptcha-response", "")
                .content(mapper.writeValueAsString(userDtoIn))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("Passwords do not match.")));
    }

    @Test
    public void registration_ShouldUserEmailIsExist() throws Exception {
        UserDtoIn userDtoIn = new UserDtoIn();
        userDtoIn.setEmail(USER_EMAIL);
        userDtoIn.setPassword(USER_PASSWORD);
        userDtoIn.setUsername(FIRST_NAME);

        mockMvc.perform(post("/api/v1/registration")
                .param("password2", USER_PASSWORD)
                .param("g-recaptcha-response", "")
                .content(mapper.writeValueAsString(userDtoIn))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.emailError", is("Email is already used.")));
    }

    @Test
    public void registration_ShouldInputFieldsAreEmpty() throws Exception {
        mockMvc.perform(post("/api/v1/registration")
                .param("password2", "")
                .param("g-recaptcha-response", "")
                .content(mapper.writeValueAsString(new UserDtoIn()))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void activateEmailCode() throws Exception {
        mockMvc.perform(get("/api/v1/registration/activate/{code}", USER_ACTIVATION_CODE))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("User successfully activated.")));
    }

    @Test
    public void activateEmailCode_ShouldNotFoundActivationCode() throws Exception {
        mockMvc.perform(get("/api/v1/registration/activate/{code}", "123"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Activation code not found.")));
    }
}

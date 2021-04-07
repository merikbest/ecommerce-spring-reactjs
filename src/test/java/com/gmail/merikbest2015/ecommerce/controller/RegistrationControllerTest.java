package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.RegistrationRequestDto;
import org.junit.Before;
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

    private RegistrationRequestDto registrationRequestDto;

    @Before
    public void init() {
        registrationRequestDto = new RegistrationRequestDto();
        registrationRequestDto.setEmail("testtest@test.com");
        registrationRequestDto.setPassword(USER_PASSWORD);
        registrationRequestDto.setPassword2(USER_PASSWORD);
        registrationRequestDto.setFirstName(FIRST_NAME);
        registrationRequestDto.setCaptcha("12345");
    }

    @Test
    public void registration_ShouldPassword2BeEmpty() throws Exception {
        registrationRequestDto.setPassword("");
        registrationRequestDto.setPassword2("");

        mockMvc.perform(post(URL_REGISTRATION_BASIC)
                .content(mapper.writeValueAsString(registrationRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2Error", is("The password confirmation must be between 6 and 16 characters long")));
    }

    @Test
    public void registration_ShouldPasswordsNotMatch() throws Exception {
        registrationRequestDto.setPassword2("12345678");

        mockMvc.perform(post(URL_REGISTRATION_BASIC)
                .content(mapper.writeValueAsString(registrationRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("Passwords do not match.")));
    }

    @Test
    public void registration_ShouldUserEmailIsExist() throws Exception {
        RegistrationRequestDto registrationRequestDto = new RegistrationRequestDto();
        registrationRequestDto.setEmail(USER_EMAIL);
        registrationRequestDto.setPassword(USER_PASSWORD);
        registrationRequestDto.setPassword2(USER_PASSWORD);
        registrationRequestDto.setFirstName(FIRST_NAME);
        registrationRequestDto.setLastName(LAST_NAME);
        registrationRequestDto.setCaptcha("12345");

        mockMvc.perform(post(URL_REGISTRATION_BASIC)
                .content(mapper.writeValueAsString(registrationRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.emailError").value("Email is already used."));
    }

    @Test
    public void registration_ShouldInputFieldsAreEmpty() throws Exception {
        mockMvc.perform(post(URL_REGISTRATION_BASIC)
                .param("password2", "")
                .param("g-recaptcha-response", "")
                .content(mapper.writeValueAsString(new RegistrationRequestDto()))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void activateEmailCode() throws Exception {
        mockMvc.perform(get(URL_REGISTRATION_ACTIVATE, USER_ACTIVATION_CODE))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("User successfully activated.")));
    }

    @Test
    public void activateEmailCode_ShouldNotFoundActivationCode() throws Exception {
        mockMvc.perform(get(URL_REGISTRATION_ACTIVATE, "123"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Activation code not found.")));
    }
}

package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetRequestDto;
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
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    private AuthenticationRequestDto authenticationRequestDto;
    private PasswordResetRequestDto passwordResetRequestDto;

    @Before
    public void init() {
        authenticationRequestDto = new AuthenticationRequestDto();
        authenticationRequestDto.setEmail(USER_EMAIL);

        passwordResetRequestDto = new PasswordResetRequestDto();
        passwordResetRequestDto.setEmail(USER_EMAIL);
        passwordResetRequestDto.setPassword(USER_PASSWORD);
        passwordResetRequestDto.setPassword2(USER_PASSWORD);
    }

    @Test
    public void login() throws Exception {
        authenticationRequestDto.setPassword(USER_PASSWORD);

        mockMvc.perform(post(URL_AUTH_LOGIN)
                .content(mapper.writeValueAsString(authenticationRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk());
    }

    @Test
    public void login_ShouldEmailOrPasswordBeNotValid() throws Exception {
        authenticationRequestDto.setPassword("123");

        mockMvc.perform(post(URL_AUTH_LOGIN)
                .content(mapper.writeValueAsString(authenticationRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Incorrect password or email")));
    }

    @Test
    public void forgotPassword() throws Exception {
        mockMvc.perform(post(URL_AUTH_FORGOT)
                .content(mapper.writeValueAsString(passwordResetRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Reset password code is send to your E-mail")));
    }

    @Test
    public void forgotPassword_ShouldEmailBeNotValid() throws Exception {
        passwordResetRequestDto.setEmail(EMAIL_FAILURE);

        mockMvc.perform(post(URL_AUTH_FORGOT)
                .content(mapper.writeValueAsString(passwordResetRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Email not found")));
    }

    @Test
    public void getPasswordResetCode() throws Exception {
        mockMvc.perform(get(URL_AUTH_RESET + "/{code}", USER_PASSWORD_RESET_CODE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER2_ID))
                .andExpect(jsonPath("$.email").value(USER2_EMAIL))
                .andExpect(jsonPath("$.firstName").value(USER2_NAME))
                .andExpect(jsonPath("$.passwordResetCode").value(USER_PASSWORD_RESET_CODE));
    }

    @Test
    public void passwordReset() throws Exception {
        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Password successfully changed!")));
    }

    @Test
    public void passwordReset_ShouldPasswordsNotMatch() throws Exception {
        passwordResetRequestDto.setPassword2("12345");

        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("Passwords do not match.")));
    }

    @Test
    public void passwordReset_ShouldPassword2BeEmpty() throws Exception {
        passwordResetRequestDto.setPassword2("");

        mockMvc.perform(post(URL_AUTH_RESET)
                .content(mapper.writeValueAsString(passwordResetRequestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2Error", is("Password confirmation cannot be empty.")));
    }
}

package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.AuthenticationRequestDto;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetDto;
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
import org.springframework.test.web.servlet.RequestBuilder;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
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

    @Test
    public void login() throws Exception {
        AuthenticationRequestDto requestDto = new AuthenticationRequestDto();
        requestDto.setEmail(USER_EMAIL);
        requestDto.setPassword(USER_PASSWORD);

        RequestBuilder requestBuilder = post("/api/v1/auth/login")
                .content(mapper.writeValueAsString(requestDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk());
    }

    @Test
    public void login_ShouldEmailOrPasswordBeNotValid() throws Exception {
        AuthenticationRequestDto request = new AuthenticationRequestDto();
        request.setEmail(USER_EMAIL);
        request.setPassword("123");

        mockMvc.perform(post("/api/v1/auth/login")
                .content(mapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$", is("Incorrect password or email")));
    }

    @Test
    public void forgotPassword() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto();
        passwordResetDto.setEmail(USER_EMAIL);

        RequestBuilder requestBuilder = post("/api/v1/auth/forgot")
                .content(mapper.writeValueAsString(passwordResetDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Reset password code is send to your E-mail")));
    }

    @Test
    public void forgotPassword_ShouldEmailBeNotValid() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto();
        passwordResetDto.setEmail(EMAIL_FAILURE);

        mockMvc.perform(post("/api/v1/auth/forgot")
                .content(mapper.writeValueAsString(passwordResetDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Email not found")));
    }

    @Test
    public void passwordReset() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto();
        passwordResetDto.setEmail(USER_EMAIL);
        passwordResetDto.setPassword(USER_PASSWORD);
        passwordResetDto.setPassword2(USER_PASSWORD);

        RequestBuilder requestBuilder = post("/api/v1/auth/reset")
                .content(mapper.writeValueAsString(passwordResetDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("Password successfully changed!")));
    }

    @Test
    public void passwordReset_ShouldPasswordsNotMatch() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto();
        passwordResetDto.setEmail(USER_EMAIL);
        passwordResetDto.setPassword(USER_PASSWORD);
        passwordResetDto.setPassword2("12345");

        mockMvc.perform(post("/api/v1/auth/reset")
                .content(mapper.writeValueAsString(passwordResetDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.passwordError", is("Passwords do not match.")));
    }

    @Test
    public void passwordReset_ShouldPassword2BeEmpty() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto();
        passwordResetDto.setEmail(USER_EMAIL);
        passwordResetDto.setPassword(USER_PASSWORD);

        mockMvc.perform(post("/api/v1/auth/reset")
                .content(mapper.writeValueAsString(passwordResetDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.password2Error", is("Password confirmation cannot be empty.")));
    }
}

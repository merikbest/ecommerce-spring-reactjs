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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.USER_EMAIL;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.USER_PASSWORD;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
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
}

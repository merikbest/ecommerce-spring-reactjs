package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.security.oauth2.OAuth2UserInfo;

import java.util.Map;

public interface AuthenticationService {

    Map<String, String> login(String email, String password);

    String registerUser(User user, String captcha, String password2);

    User registerOauth2User(String provider, OAuth2UserInfo oAuth2UserInfo);

    User updateOauth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);

    String activateUser(String code);

    User findByPasswordResetCode(String code);

    String sendPasswordResetCode(String email);

    String passwordReset(String email, String password, String password2);
}

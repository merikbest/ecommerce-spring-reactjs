package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Order;
import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.security.oauth2.OAuth2UserInfo;
import graphql.schema.DataFetcher;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

import java.util.List;
import java.util.Map;

public interface UserService {

    User findUserById(Long userId);

    User findUserByEmail(String email);

    DataFetcher<List<User>> getAllUsersByQuery();

    DataFetcher<User> getUserByQuery();

    List<User> findAllUsers();

    User findByPasswordResetCode(String code);

    List<Perfume> getCart(List<Long> perfumeIds);

    Map<String, Object> login(String email);

    boolean registerUser(User user);

    User registerOauth2User(String provider, OAuth2UserInfo oAuth2UserInfo);

    User updateOauth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);

    boolean activateUser(String code);

    boolean sendPasswordResetCode(String email);

    void passwordReset(String email, String password);

    void userSave(String username, Map<String, String> form, User user);

    User updateProfile(String email, User user);

    void addReviewToPerfume(Review review, Long perfumeId);
}

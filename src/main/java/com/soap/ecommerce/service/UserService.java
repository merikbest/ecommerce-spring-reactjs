package com.soap.ecommerce.service;

import com.soap.ecommerce.domain.Perfume;
import com.soap.ecommerce.domain.Review;
import com.soap.ecommerce.domain.User;
import com.soap.ecommerce.security.oauth2.OAuth2UserInfo;
import graphql.schema.DataFetcher;

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

    String passwordReset(String email, String password);

    User updateProfile(String email, User user);

    Perfume addReviewToPerfume(Review review, Long perfumeId);
}

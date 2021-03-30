package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    User findUserById(Long userId);

    User findUserByEmail(String email);

    List<User> findAllUsers();

    User findByPasswordResetCode(String code);

    User saveUser(User user);

    List<Perfume> getCart(List<Long> perfumeIds);

    Map<String, Object> login(String email);

    boolean registerUser(User user);

    void registerOauthUser(String email, String username);

    void updateOauthUser(User user, String username);

    boolean activateUser(String code);

    boolean sendPasswordResetCode(String email);

    void passwordReset(String email, String password);

    void userSave(String username, Map<String, String> form, User user);

    void updateProfile(User user, String password, String email);

    void addReviewToPerfume(Review review, Long perfumeId);
}

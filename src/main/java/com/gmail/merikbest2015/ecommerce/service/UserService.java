package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    User findUserById(Long userId);

    User findByEmail(String email);

    List<User> findAllUsers();

    User findByUsername(String username);

    User findByActivationCode(String code);

    User findByPasswordResetCode(String code);

    User saveUser(User user);

    boolean addUser(User user);

    boolean activateUser(String code);

    boolean sendPasswordResetCode(String email);

    void passwordReset(String email, String password);

    void userSave(String username, Map<String, String> form, User user);

    void updateProfile(User user, String password, String email);

    void addReviewToPerfume(Review review, Long perfumeId);
}

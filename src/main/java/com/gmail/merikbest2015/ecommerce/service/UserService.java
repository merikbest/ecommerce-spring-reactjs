package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetDto;
import com.gmail.merikbest2015.ecommerce.dto.ReviewDto;

import java.util.List;
import java.util.Map;

public interface UserService {

    User getOne(Long id);

    User findByEmail(String email);

    List<User> findAll();

    User findByUsername(String username);

    User findByActivationCode(String code);

    User findByPasswordResetCode(String code);

    User save(User user);

    boolean addUser(User user);

    boolean activateUser(String code);

    void sendMessage(User user, List<String> emailMessages, String subject, String code, String urlPart);

    boolean sendPasswordResetCode(String email);

    void passwordReset(PasswordResetDto passwordReset);

    void userSave(String username, Map<String, String> form, User user);

    void updateProfile(User user, String password, String email);

    void addReviewToPerfume(ReviewDto reviewDto, Long perfumeId);
}

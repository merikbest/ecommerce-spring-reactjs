package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import graphql.schema.DataFetcher;

import java.util.List;

public interface UserService {

    User getUserById(Long userId);

    User getUserInfo(String email);

    List<User> getAllUsers();

    List<Perfume> getCart(List<Long> perfumeIds);

    User updateUserInfo(String email, User user);

    Review addReviewToPerfume(Review review, Long perfumeId);

    DataFetcher<List<User>> getAllUsersByQuery();

    DataFetcher<User> getUserByQuery();
}

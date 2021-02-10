package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.review.ReviewDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoIn;
import com.gmail.merikbest2015.ecommerce.dto.user.UserDtoOut;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertUserToEntity() {
        UserDtoIn userDtoIn = new UserDtoIn();
        userDtoIn.setUsername(FIRST_NAME);
        userDtoIn.setEmail(USER_EMAIL);
        userDtoIn.setPassword(USER_PASSWORD);

        User user = modelMapper.map(userDtoIn, User.class);
        assertEquals(userDtoIn.getUsername(), user.getUsername());
        assertEquals(userDtoIn.getEmail(), user.getEmail());
        assertEquals(userDtoIn.getPassword(), user.getPassword());
    }

    @Test
    public void convertToDtoIn() {
        User user = new User();
        user.setUsername(FIRST_NAME);
        user.setEmail(USER_EMAIL);
        user.setPassword(USER_PASSWORD);

        UserDtoIn userDtoIn = modelMapper.map(user, UserDtoIn.class);
        assertEquals(user.getUsername(), userDtoIn.getUsername());
        assertEquals(user.getEmail(), userDtoIn.getEmail());
        assertEquals(user.getPassword(), userDtoIn.getPassword());
    }

    @Test
    public void convertToDtoOut() {
        User user = new User();
        user.setId(1L);
        user.setUsername(FIRST_NAME);
        user.setEmail(USER_EMAIL);
        user.setActive(true);

        UserDtoOut userDtoOut = modelMapper.map(user, UserDtoOut.class);
        assertEquals(user.getId(), userDtoOut.getId());
        assertEquals(user.getUsername(), userDtoOut.getUsername());
        assertEquals(user.getEmail(), userDtoOut.getEmail());
        assertEquals(user.isActive(), userDtoOut.isActive());
    }

    @Test
    public void convertReviewToEntity() {
        ReviewDtoIn reviewDtoIn = new ReviewDtoIn();
        reviewDtoIn.setAuthor(FIRST_NAME);
        reviewDtoIn.setMessage("Hello World!");

        Review review = modelMapper.map(reviewDtoIn, Review.class);
        assertEquals(reviewDtoIn.getAuthor(), review.getAuthor());
        assertEquals(reviewDtoIn.getMessage(), review.getMessage());
    }
}

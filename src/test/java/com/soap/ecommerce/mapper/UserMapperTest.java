package com.soap.ecommerce.mapper;

import com.soap.ecommerce.domain.Review;
import com.soap.ecommerce.domain.User;
import com.soap.ecommerce.dto.RegistrationRequestDto;
import com.soap.ecommerce.dto.review.ReviewRequestDto;
import com.soap.ecommerce.dto.user.UserRequestDto;
import com.soap.ecommerce.dto.user.UserResponseDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.soap.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertUserRequestDtoToEntity() {
        UserRequestDto userRequestDto = new UserRequestDto();
        userRequestDto.setFirstName(FIRST_NAME);
        userRequestDto.setEmail(USER_EMAIL);

        User user = modelMapper.map(userRequestDto, User.class);
        assertEquals(userRequestDto.getFirstName(), user.getFirstName());
        assertEquals(userRequestDto.getEmail(), user.getEmail());
    }

    @Test
    public void convertRegistrationRequestDtoToEntity() {
        RegistrationRequestDto registrationRequestDto = new RegistrationRequestDto();
        registrationRequestDto.setFirstName(FIRST_NAME);
        registrationRequestDto.setEmail(USER_EMAIL);
        registrationRequestDto.setPassword(USER_PASSWORD);

        User user = modelMapper.map(registrationRequestDto, User.class);
        assertEquals(registrationRequestDto.getFirstName(), user.getFirstName());
        assertEquals(registrationRequestDto.getEmail(), user.getEmail());
        assertEquals(registrationRequestDto.getPassword(), user.getPassword());
    }

    @Test
    public void convertReviewToEntity() {
        ReviewRequestDto reviewRequestDto = new ReviewRequestDto();
        reviewRequestDto.setAuthor(FIRST_NAME);
        reviewRequestDto.setMessage("Hello World!");

        Review review = modelMapper.map(reviewRequestDto, Review.class);
        assertEquals(reviewRequestDto.getAuthor(), review.getAuthor());
        assertEquals(reviewRequestDto.getMessage(), review.getMessage());
    }

    @Test
    public void convertToResponseDto() {
        User user = new User();
        user.setFirstName(FIRST_NAME);
        user.setEmail(USER_EMAIL);

        UserResponseDto userRequestDto = modelMapper.map(user, UserResponseDto.class);
        assertEquals(user.getFirstName(), userRequestDto.getFirstName());
        assertEquals(user.getEmail(), userRequestDto.getEmail());
    }
}

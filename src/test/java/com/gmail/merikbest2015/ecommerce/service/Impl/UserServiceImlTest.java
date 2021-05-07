package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.*;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.repository.ReviewRepository;
import com.gmail.merikbest2015.ecommerce.repository.UserRepository;
import com.gmail.merikbest2015.ecommerce.security.JwtProvider;
import com.gmail.merikbest2015.ecommerce.security.oauth2.GoogleOAuth2UserInfo;
import com.gmail.merikbest2015.ecommerce.service.email.MailSender;
import org.hamcrest.CoreMatchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserServiceImlTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PerfumeRepository perfumeRepository;

    @MockBean
    private ReviewRepository reviewRepository;

    @MockBean
    private JwtProvider jwtProvider;

    @MockBean
    private MailSender mailSender;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    public void findUserById() {
        User user = new User();
        user.setId(122L);

        when(userRepository.findById(122L)).thenReturn(java.util.Optional.of(user));
        userService.findUserById(122L);
        assertEquals(122L, user.getId());
        verify(userRepository, times(1)).findById(122L);
    }

    @Test
    public void findUserByEmail() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        userService.findUserByEmail(USER_EMAIL);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        assertEquals(USER_EMAIL, user.getEmail());
        verify(userRepository, times(1)).findByEmail(USER_EMAIL);
    }

    @Test
    public void findAllUsers() {
        List<User> usersList = new ArrayList<>();
        usersList.add(new User());
        usersList.add(new User());
        userService.findAllUsers();

        when(userRepository.findAllByOrderByIdAsc()).thenReturn(usersList);
        assertEquals(2, usersList.size());
        verify(userRepository, times(1)).findAllByOrderByIdAsc();
    }

    @Test
    public void findByPasswordResetCode() {
        User user = new User();
        user.setPasswordResetCode(USER_PASSWORD_RESET_CODE);
        userService.findByPasswordResetCode(USER_PASSWORD_RESET_CODE);

        when(userRepository.findByPasswordResetCode(USER_PASSWORD_RESET_CODE)).thenReturn(user);
        assertEquals(USER_PASSWORD_RESET_CODE, user.getPasswordResetCode());
        verify(userRepository, times(1)).findByPasswordResetCode(USER_PASSWORD_RESET_CODE);
    }

    @Test
    public void getCart() {
        List<Long> perfumeIds = new ArrayList<>(Arrays.asList(2L, 4L));
        Perfume firstPerfume = new Perfume();
        firstPerfume.setId(2L);
        Perfume secondPerfume = new Perfume();
        secondPerfume.setId(4L);
        List<Perfume> perfumeList = new ArrayList<>(Arrays.asList(firstPerfume, secondPerfume));
        userService.getCart(perfumeIds);

        when(perfumeRepository.findByIdIn(perfumeIds)).thenReturn(perfumeList);
        assertEquals(2, perfumeList.size());
        assertEquals(2, perfumeIds.size());
        assertNotNull(perfumeList);
        verify(perfumeRepository, times(1)).findByIdIn(perfumeIds);
    }

    @Test
    public void login() {
        User user = new User();
        user.setId(123L);
        user.setEmail(USER_EMAIL);
        user.setActive(true);
        user.setFirstName(FIRST_NAME);
        user.setRoles(Collections.singleton(Role.USER));

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        assertEquals(123L, user.getId());
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        userService.login(USER_EMAIL);
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(jwtProvider, times(1)).createToken(user.getEmail(), user.getRoles().iterator().next().name());
    }

    @Test
    public void loadUserByUsername() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setActive(true);
        user.setFirstName(FIRST_NAME);
        user.setRoles(Collections.singleton(Role.USER));

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        assertTrue(user.isActive());
    }

    @Test
    public void registerUser() {
        User user = new User();
        user.setFirstName(FIRST_NAME);
        user.setEmail(USER_EMAIL);
        boolean isUserCreated = userService.registerUser(user);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstName", FIRST_NAME);
        attributes.put("registrationUrl", "http://localhost:3000/activate/" + user.getActivationCode());

        assertTrue(isUserCreated);
        assertNotNull(user.getActivationCode());
        assertTrue(CoreMatchers.is(user.getRoles()).matches(Collections.singleton(Role.USER)));
        verify(userRepository, times(1)).save(user);
        verify(mailSender, times(1))
                .sendMessageHtml(
                        ArgumentMatchers.eq(user.getEmail()),
                        ArgumentMatchers.eq("Activation code"),
                        ArgumentMatchers.eq("registration-template"),
                        ArgumentMatchers.eq(attributes));
    }

    @Test
    public void registerOauthUser() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", 123456);
        attributes.put("given_name", FIRST_NAME);
        attributes.put("family_name", LAST_NAME);
        attributes.put("email", USER_EMAIL);
        GoogleOAuth2UserInfo userInfo = new GoogleOAuth2UserInfo(attributes);

        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setFirstName(FIRST_NAME);
        user.setLastName(LAST_NAME);
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        user.setProvider(AuthProvider.GOOGLE);

        when(userRepository.save(user)).thenReturn(user);
        userService.registerOauth2User("google", userInfo);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        assertEquals(LAST_NAME, user.getLastName());
        assertNull(user.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void updateOauthUser() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", 123456);
        attributes.put("given_name", FIRST_NAME);
        attributes.put("family_name", LAST_NAME);
        attributes.put("email", USER_EMAIL);
        GoogleOAuth2UserInfo userInfo = new GoogleOAuth2UserInfo(attributes);

        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setFirstName(FIRST_NAME);
        user.setLastName(LAST_NAME);
        user.setProvider(AuthProvider.GOOGLE);

        when(userRepository.save(user)).thenReturn(user);
        userService.updateOauth2User(user, "google", userInfo);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        assertEquals(LAST_NAME, user.getLastName());
        assertEquals(AuthProvider.GOOGLE, user.getProvider());
        assertNull(user.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void sendPasswordResetCode() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setPasswordResetCode(USER_PASSWORD_RESET_CODE);

        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        userService.sendPasswordResetCode(USER_EMAIL);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("firstName", null);
        attributes.put("resetUrl", "http://localhost:3000/reset/" + user.getPasswordResetCode());

        assertEquals(USER_EMAIL, user.getEmail());
        assertNotNull(user.getPasswordResetCode());
        verify(userRepository, times(1)).save(user);
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(mailSender, times(1))
                .sendMessageHtml(
                        ArgumentMatchers.eq(user.getEmail()),
                        ArgumentMatchers.eq("Password reset"),
                        ArgumentMatchers.eq("password-reset-template"),
                        ArgumentMatchers.eq(attributes));
    }

    @Test
    public void passwordReset() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setPassword(USER_PASSWORD);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        when(passwordEncoder.encode(USER_PASSWORD)).thenReturn(user.getPassword());
        when(userRepository.save(user)).thenReturn(user);
        userService.passwordReset(user.getEmail(), user.getPassword());
        assertEquals(USER_EMAIL, user.getEmail());
        assertNotNull(user.getPassword());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void activateUser() {
        User user = new User();
        user.setActivationCode(USER_ACTIVATION_CODE);

        when(userRepository.findByActivationCode(USER_ACTIVATION_CODE)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        boolean isActivated = userService.activateUser(user.getActivationCode());
        assertTrue(isActivated);
        assertNull(user.getActivationCode());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void updateProfile() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setFirstName(FIRST_NAME);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        userService.updateProfile(USER_EMAIL, user);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void addReviewToPerfume() {
        List<Review> reviewList = new ArrayList<>();
        Review review = new Review();
        review.setRating(5);
        reviewList.add(review);
        Perfume perfume = new Perfume();
        perfume.setId(123L);
        perfume.setReviews(reviewList);

        when(perfumeRepository.getOne(123L)).thenReturn(perfume);
        when(reviewRepository.save(review)).thenReturn(review);
        userService.addReviewToPerfume(review, 123L);
        assertEquals(123L, perfume.getId());
        assertNotNull(perfume.getReviews());
        verify(perfumeRepository, times(1)).getOne(123L);
        verify(reviewRepository, times(1)).save(review);
    }
}

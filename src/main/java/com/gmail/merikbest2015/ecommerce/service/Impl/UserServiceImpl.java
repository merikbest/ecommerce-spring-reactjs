package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.Role;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.dto.PasswordResetDto;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.repository.ReviewRepository;
import com.gmail.merikbest2015.ecommerce.repository.UserRepository;
import com.gmail.merikbest2015.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service("userDetailsServiceImpl")
public class UserServiceImpl implements UserDetailsService, UserService {

    @Value("${hostname}")
    private String hostname;
    private final UserRepository userRepository;
    private final MailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final PerfumeRepository perfumeRepository;
    private final ReviewRepository reviewRepository;

    public UserServiceImpl(UserRepository userRepository,
                           MailSender mailSender,
                           PasswordEncoder passwordEncoder,
                           PerfumeRepository perfumeRepository,
                           ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.perfumeRepository = perfumeRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByActivationCode(String code) {
        return userRepository.findByActivationCode(code);
    }

    @Override
    public User findByPasswordResetCode(String code){
        return userRepository.findByPasswordResetCode(code);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException, LockedException {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (user.getActivationCode() != null) {
            throw new LockedException("email not activated");
        }
        return user;
    }

    @Override
    public boolean addUser(User user) {
        User userFromDb = userRepository.findByEmail(user.getEmail());

        if (userFromDb != null) {
            return false;
        }
        user.setActive(false);
        user.setRoles(Collections.singleton(Role.USER));
        user.setActivationCode(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        String subject = "Activation code";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("Welcome to Perfume online store.");
        emailMessages.add("Please follow the link ");
        sendMessage(user, emailMessages, subject, user.getActivationCode(), "activate");
        return true;
    }

    @Override
    public boolean sendPasswordResetCode(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }
        user.setPasswordResetCode(UUID.randomUUID().toString());
        userRepository.save(user);

        String subject = "Password reset";
        List<String> emailMessages = new ArrayList<>();
        emailMessages.add("We have received a request to reset the password for your account.");
        emailMessages.add("To reset your password, follow this link ");
        sendMessage(user, emailMessages, subject, user.getPasswordResetCode(), "reset");
        return true;
    }

    public void sendMessage(User user, List<String> emailMessages, String subject, String code, String urlPart) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format("Hello, %s! \n" + "%s \n" + "%s http://%s/%s/%s",
                    user.getUsername(),
                    emailMessages.get(0),
                    emailMessages.get(1),
                    hostname,
                    urlPart,
                    code
            );
            mailSender.send(user.getEmail(), subject, message);
        }
    }

    @Override
    public void passwordReset(String email, String password) {
        User user = userRepository.findByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetCode(null);
        userRepository.save(user);
    }

    @Override
    public boolean activateUser(String code) {
        User user = userRepository.findByActivationCode(code);

        if (user == null) {
            return false;
        }
        user.setActivationCode(null);
        user.setActive(true);
        userRepository.save(user);
        return true;
    }

    @Override
    public void userSave(String username, Map<String, String> form, User user) {
        user.setUsername(username);
        Set<String> roles = Arrays.stream(Role.values())
                .map(Role::name)
                .collect(Collectors.toSet());

        user.getRoles().clear();

        for (String key : form.keySet()) {
            if (roles.contains(key)) {
                user.getRoles().add(Role.valueOf(key));
            }
        }
        userRepository.save(user);
    }

    @Override
    public void updateProfile(User user, String password, String email) {
        String userEmail = user.getEmail();
        boolean isEmailChanged = (email != null && !email.equals(userEmail)) ||
                (userEmail != null && !userEmail.equals(email));

        if (isEmailChanged) {
            user.setEmail(email);

            if (!StringUtils.isEmpty(email)) {
                user.setActivationCode(UUID.randomUUID().toString());
            }
        }

        if (!StringUtils.isEmpty(password)) {
            user.setPassword(passwordEncoder.encode(password));
        }
        userRepository.save(user);

//        if (isEmailChanged) {
//            sendMessage(user);
//        }
    }

    @Override
    public void addReviewToPerfume(Review review, Long perfumeId) {
        Perfume perfume = perfumeRepository.getOne(perfumeId);
        perfume.getReviews().add(review);
        reviewRepository.save(review);
    }
}

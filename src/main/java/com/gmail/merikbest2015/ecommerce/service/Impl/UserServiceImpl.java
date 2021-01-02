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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * The service layer class implements the accessor methods of {@link User} objects
 * in the {@link UserService} interface database.
 * The class is marked with the @Service annotation - an annotation announcing that this class
 * is a service - a component of the service layer. Service is a subtype of @Component class.
 * Using this annotation will automatically search for service beans.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see User
 * @see UserService
 * @see UserDetailsService
 * @see UserRepository
 * @see MailSender
 */
@Service("userDetailsServiceImpl")
public class UserServiceImpl implements UserDetailsService, UserService {
    /**
     * Implementation of the {@link UserRepository} interface
     * for working with users with a database.
     */
    private final UserRepository userRepository;

    /**
     * Implementation of the {@link MailSender} class
     * for working with email.
     */
    private final MailSender mailSender;

    /**
     * Implementation of the {@link PasswordEncoder} interface
     * for encoding passwords.
     */
    private final PasswordEncoder passwordEncoder;

    // Doc
    private final PerfumeRepository perfumeRepository;

    // Doc
    private final ReviewRepository reviewRepository;

    /**
     * Host name.
     */
    @Value("${hostname}")
    private String hostname;

    /**
     * Constructor for initializing the main variables of the user service.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     * @param userRepository  implementation of the {@link UserRepository} interface
     *                        for working with users with a database.
     * @param mailSender      implementation of the {@link MailSender} class
     *                        for working with email.
     * @param passwordEncoder implementation of the {@link PasswordEncoder} interface
     * @param perfumeRepository
     * @param reviewRepository
     */
    @Autowired
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

    /**
     * Retrieves an User by its id.
     *
     * @param id must not be null.
     * @return User with the given id.
     */
    @Override
    public User getOne(Long id) {
        return userRepository.getOne(id);
    }

    /**
     * Returns the user with the same email as the value of the input parameter.
     *
     * @param email user name to return.
     * @return The {@link User} class object.
     */
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Return list of all registered users.
     *
     * @return list of {@link User}.
     */
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * Returns the user with the same name as the value of the input parameter.
     *
     * @param username user name to return.
     * @return The {@link User} class object.
     */
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Returns the user that has the same activation code as the value of the input parameter.
     *
     * @param code activation code to return.
     * @return The {@link User} class object.
     */
    @Override
    public User findByActivationCode(String code) {
        return userRepository.findByActivationCode(code);
    }

    /**
     * Returns the user that has the same password reset code as the value of the input parameter.
     *
     * @param code password reset code.
     * @return The {@link User} class object.
     */
    @Override
    public User findByPasswordResetCode(String code){
        return userRepository.findByPasswordResetCode(code);
    }

    /**
     * Save user info.
     *
     * @param user user object to return.
     * @return The {@link User} class object which will be saved in the database.
     */
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Locates the user based on the email.
     *
     * @param email the email identifying the user whose data is required.
     * @return a fully populated user record.
     * @throws UsernameNotFoundException if the user could not be found or the user has no GrantedAuthority.
     * @throws LockedException           if an authentication request is rejected because the account is locked.
     */
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

    /**
     * Save user in database and send activation code to user email.
     *
     * @param user user who has registered.
     * @return true if the user is not exists.
     */
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

    /**
     * Send password reset code to user email.
     *
     * @param email users email.
     * @return true if user email is exists.
     */
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

    /**
     * Send message to user email with activation/reset code.
     *
     * @param user the user to whom a message with an activation/reset code will be sent to email.
     * @param emailMessages email message body.
     * @param subject email message subject.
     * @param code activation/reset code.
     * @param urlPart part of url.
     */
    @Override
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

    /**
     * Reset user password.
     *
     * @param passwordReset data transfer object with user email and password.
     */
    @Override
    public void passwordReset(PasswordResetDto passwordReset) {
        User user = userRepository.findByEmail(passwordReset.getEmail());
        user.setPassword(passwordEncoder.encode(passwordReset.getPassword()));
        user.setPasswordResetCode(null);

        userRepository.save(user);
    }

    /**
     * Return true if activation code is exists.
     *
     * @param code activation code from the database.
     * @return true if activation code is exists.
     */
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

    /**
     * Save updated user with set of roles.
     *
     * @param username user name of registered user.
     * @param form     form of user roles.
     * @param user     user from the database.
     */
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

    /**
     * Save updated user profile with new password or email.
     *
     * @param user     user from the database.
     * @param password the user's password to be changed.
     * @param email    the user's email to be changed.
     */
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

    /**
     * Save perfume review.
     *
     * @param review    review for current perfume with author and message.
     * @param perfumeId perfume id in database.
     */
    @Override
    public void addReviewToPerfume(Review review, Long perfumeId) {
        Perfume perfume = perfumeRepository.getOne(perfumeId);
        Review perfumeReview = new Review();
        perfumeReview.setAuthor(review.getAuthor());
        perfumeReview.setMessage(review.getMessage());
        perfumeReview.setDate(LocalDate.now());
        perfume.getReviews().add(perfumeReview);

        reviewRepository.save(perfumeReview);
    }
}
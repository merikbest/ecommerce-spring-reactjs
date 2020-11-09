package com.gmail.merikbest2015.ecommerce.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.List;
import java.util.Set;

/**
 * The class describes the "User" entity implements methods of the {@link UserDetails} interface.
 * The @Entity annotation says that objects of this class will be processed by hibernate.
 * The @Table (name = "usr") annotation indicates to the "usr" table in which the objects will be stored.
 * The @Getter and @Setter annotation generates getters and setters for all fields.
 * The @NoArgsConstructor annotation generates no-args constructor.
 * The @EqualsAndHashCode annotation generates implementations for the {@code equals} and {@code hashCode} methods inherited
 * by all objects, based on relevant fields.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see UserDetails
 * @see Perfume
 */
@Entity
@Table(name = "usr")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = {"id", "username", "activationCode"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements UserDetails {
    /**
     * The unique code of the object.
     * The @Id annotation says that the field is the key for the current object.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * User name.
     * The @NotBlank annotation says the field should not be empty.
     */
    @NotBlank(message = "Имя пользователя не может быть пустым")
    private String username;

    /**
     * User password for logging into account on the site.
     * The @NotBlank annotation says the field should not be empty.
     */
    @NotBlank(message = "Пароль не может быть пустым")
    private String password;

    /**
     * User email.
     * The @Email annotation says the string has to be a well-formed email address.
     * The @NotBlank annotation says the field should not be empty.
     */
    @Email(message = "Неправильный email")
    @NotBlank(message = "Email не может быть пустым")
    private String email;

    /**
     * Provides access to the site if the user has confirmed the activation code on his email.
     */
    private boolean active;

    /**
     * Activation code that is sent to the user's email.
     */
    private String activationCode;

    /**
     * User role. User can have multiple roles.
     * Sampling on first access to the current object.
     * The value of the field (id of the {@link User}) is stored in the "user_id" column.
     */
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    /**
     * List of products in the shopping cart.
     * Between the {@link User} and {@link Perfume} objects, there is a many-to-many relationship, that is,
     * every record in one table is directly related to every record in another table.
     * Sampling on first access to the current object.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Perfume> perfumeList;

    /**
     * Method for verifying a user with administrator rights.
     */
    public boolean isAdmin() {
        return roles.contains(Role.ADMIN);
    }

    /**
     * Returns a boolean value depending on the account expiration date.
     * Indicates whether the user's account has expired. An expired account cannot be authenticated.
     * Implemented interface method {@link UserDetails}.
     *
     * @return {@code true} - if the user's account is valid (ie non-expired).
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is locked or unlocked. A locked user cannot be authenticated.
     * Implemented interface method {@link UserDetails}.
     *
     * @return {@code true} - if the user is not locked.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) has expired. Expired credentials prevent authentication.
     * Implemented interface method {@link UserDetails}.
     *
     * @return {@code true} if the user's credentials are valid (ie non-expired).
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled or disabled. A disabled user cannot be authenticated.
     * Implemented interface method {@link UserDetails}.
     *
     * @return {@code true} if the user is enabled.
     */
    @Override
    public boolean isEnabled() {
        return isActive();
    }

    /**
     * Returns the authorities granted to the user.
     * Implemented interface method {@link UserDetails}.
     *
     * @return object of type {@link Set} is a list of user roles.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }
}
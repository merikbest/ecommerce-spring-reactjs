package com.gmail.merikbest2015.ecommerce.domain;

import org.springframework.security.core.GrantedAuthority;

/**
 * Enumeration of possible user roles implements methods of the {@link GrantedAuthority} interface.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 * @see GrantedAuthority
 */
public enum Role implements GrantedAuthority {
    /**
     * Site customer role.
     */
    USER,

    /**
     * Site administrator role.
     *
     */
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
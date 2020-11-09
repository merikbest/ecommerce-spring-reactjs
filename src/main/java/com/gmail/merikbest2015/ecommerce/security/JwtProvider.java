package com.gmail.merikbest2015.ecommerce.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

/**
 * Class for generating and verifying JWT.
 * The following utility class will be used for generating a JWT after a user logs in successfully,
 * and validating the JWT sent in the Authorization header of the requests.
 * The @Component annotation indicates that this class is a "component". Such classes are considered
 * as candidates for auto-detection when using annotation-based configuration and classpath scanning.
 *
 * @author Miroslav Khotinskiy (merikbest2015@gmail.com)
 * @version 1.0
 */
@Component
public class JwtProvider {
    /**
     * Interface which loads user-specific data.
     */
    private final UserDetailsService userDetailsService;

    /**
     * Request header where the JWT is stored.
     */
    @Value("${jwt.header}")
    private String authorizationHeader;

    /**
     * Secret key for signature algorithm.
     */
    @Value("${jwt.secret}")
    private String secretKey;

    /**
     * Validity JWT in milliseconds.
     */
    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    /**
     * Constructor for initializing the main variables of the JWT provider class.
     * The @Autowired annotation will allow Spring to automatically initialize objects.
     *
     * @param userDetailsService interface which loads user-specific data.
     */
    @Autowired
    public JwtProvider(@Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    /**
     * Encode secret key by Base64 encoding scheme.
     */
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * Create JWT based on data to transfer.
     *
     * @param username  user name.
     * @param role      user role.
     * @return JWT with claims, date and sign algorithm.
     * */
    public String createToken(String username, String role) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("role", role);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * Validate JWT expiration timestamp.
     *
     * @param token JWT.
     * @return true if JWT is not expired and return JwtAuthenticationException if JWT expired.
     */
    public boolean validateToken(String token) {

        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Get authentication user from JWT.
     *
     * @param token JWT.
     * @return authenticated user from JWT.
     */
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * Get username from JWT.
     *
     * @param token JWT.
     * @return username from JWT.
     */
    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Resolve JWT.
     *
     * @param request HTTP request.
     * @return request header where the JWT is stored.
     */
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }
}

package org.learn.todo.config;

import lombok.AllArgsConstructor;
import org.learn.todo.security.JwtAuthenticationEntryPoint;
import org.learn.todo.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@AllArgsConstructor
@EnableMethodSecurity
@Configuration
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;
    private JwtAuthenticationEntryPoint authenticationEntryPoint;
    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf->csrf.disable())
                .authorizeHttpRequests((authorize)->{
//                    authorize.requestMatchers(HttpMethod.POST,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.GET,"/api/**").hasAnyRole("ADMIN","USER");
//                    authorize.requestMatchers(HttpMethod.PATCH,"/api/**").hasAnyRole("ADMIN","USER");
//                    authorize.requestMatchers(HttpMethod.GET,"/api/**").permitAll();
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic(Customizer.withDefaults());

        httpSecurity.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint));

        httpSecurity.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

//    @Bean
//    public UserDetailsService userDetailsService(){
//        UserDetails lakshan = User.builder()
//                .username("lakshan")
//                .password(passwordEncoder().encode("123"))
//                .roles("USER")
//                .build();
//
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(lakshan,admin);
//    }

}

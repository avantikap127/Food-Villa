package com.foodordering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodordering.entity.User;
import com.foodordering.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));// here we are encoding the password means we are converting it to a hash before saving it to the database. Paassword is stored in the database in a hashed format for security reasons. So when the user tries to login, we will encode the password they entered and compare it with the hashed password stored in the database. If they match, then the login is successful. passwordEncoder is a bean that we have defined in our configuration class and it uses the BCrypt algorithm to hash the password. BCrypt is a strong hashing algorithm that is designed to be slow, which makes it resistant to brute-force attacks. By encoding the password before saving it to the database, we ensure that even if the database is compromised, the attackers will not have access to the actual passwords of the users.
        userRepository.save(user);

        return "User registered successfully";
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) { // here passwordEncoder.matches() method is used to compare the raw password entered by the user with the hashed password stored in the database. It takes the raw password and the hashed password as arguments and returns true if they match, otherwise it returns false. This is how we verify that the password entered by the user is correct without ever exposing the actual password in our code or database.
            return user;
        }

        return null;
    }
}
package com.webwalletapp.Controller;

import com.webwalletapp.Entity.User;
import com.webwalletapp.Repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/users/{login}")
    public User getUserByName(@PathVariable(value = "login") String login){
        return userRepository.findUserByLogin(login);
    }

    @CrossOrigin
    @DeleteMapping("/users/{login}")
    public void deleteById(@PathVariable(value = "login") String login){
        userRepository.deleteByLogin(login);
    }

    @CrossOrigin
    @PutMapping("/users/user")
    public User addNewUser(@RequestBody User user){
        return userRepository.save(user);
    }
}

package com.webwalletapp.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webwalletapp.Entity.User;
import com.webwalletapp.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @CrossOrigin
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable(value = "userId") Integer userId) {
        return userRepository.findUserByUserId(userId);
    }

    @CrossOrigin
    @DeleteMapping("/users/{login}")
    public void deleteById(@PathVariable(value = "login") String login) {
        userRepository.deleteByLogin(login);
    }

    @CrossOrigin
    @PutMapping("/users/user")
    public User addNewUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @CrossOrigin
    @PostMapping("/users/{id}")
    public void changeBalance(@PathVariable(value = "id") Integer userId, @RequestParam BigDecimal newBalance){
        User userByUserId = userRepository.findUserByUserId(userId);
        userByUserId.setTotalMoney(newBalance);
        userRepository.save(userByUserId);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody String credentials) {
        try {
            ObjectMapper om = new ObjectMapper();
            JsonNode jn = om.readTree(credentials);
            System.out.println(jn.get("login"));
            System.out.println(jn.get("password"));
            User user = userRepository.findUserByLogin(jn.get("login").toString().replace("\"", ""));
            String frontPassword = jn.get("password").toString().replace("\"", "");
            if (user != null && user.getPassword().equals(frontPassword)) {
                System.out.println("1");
                return new ResponseEntity<>("{\"result\":\"Login success\", \"userId\":" + user.getUserId() + "}", HttpStatus.OK);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("2");
            return new ResponseEntity<>("{\"result\":\"Internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        System.out.println("3");
        return new ResponseEntity<>("{\"result\":\"Incorrect credentials\"}", HttpStatus.BAD_REQUEST);
    }
}

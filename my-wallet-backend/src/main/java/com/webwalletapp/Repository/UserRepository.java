package com.webwalletapp.Repository;

import com.webwalletapp.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByLogin(String login);
    User findUserByUserId(Integer ID);
    void deleteByLogin(String login);
}

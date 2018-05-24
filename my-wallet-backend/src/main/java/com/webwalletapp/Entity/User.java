package com.webwalletapp.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_ID")
    private int userId;

    @JsonProperty("login")
    @Column(name = "Login")
    private String login;

    @JsonProperty("password")
    @Column(name = "Password")
    private String password;

    @JsonProperty("role")
    @Column(name = "Role")
    private String role;

    @JsonProperty("email")
    @Column(name = "Email")
    private String email;

    @JsonProperty("total_money")
    @Column(name = "total_money")
    private BigDecimal totalMoney;

    public User() {
    }

    public User(String login, String password, String role, String email, BigDecimal totalMoney) {
        this.login = login;
        this.password = password;
        this.role = role;
        this.email = email;
        this.totalMoney = totalMoney;
    }
}

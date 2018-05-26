package com.webwalletapp.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Transaction_ID")
    private int transactionId;

    @Column(name="User_ID")
    private Integer userId;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Description")
    private String description;

    @Column(name = "Price")
    private BigDecimal price;

    @Column(name = "Category_ID")
    private int categoryId;

    @Column(name = "Type")
    private String type;

    public Transaction() {
    }

    public Transaction(Integer userId, LocalDate date, String description, BigDecimal price, int categoryId, String type) {
        this.userId = userId;
        this.date = date;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.type = type;
    }
}

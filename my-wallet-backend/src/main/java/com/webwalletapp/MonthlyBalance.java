package com.webwalletapp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Setter
@Getter
@ToString
public class MonthlyBalance {
    private int year;
    private int month;
    private BigDecimal monthlyExpenses;
    private BigDecimal monthlyIncomes;

    public MonthlyBalance(int year, int month, BigDecimal monthlyExpenses, BigDecimal monthlyIncomes) {
        this.year = year;
        this.month = month;
        this.monthlyExpenses = monthlyExpenses;
        this.monthlyIncomes = monthlyIncomes;
    }
}

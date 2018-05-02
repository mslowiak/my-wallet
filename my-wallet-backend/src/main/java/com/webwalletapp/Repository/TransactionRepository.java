package com.webwalletapp.Repository;

import com.webwalletapp.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query(
            value = "SELECT c.name as categoryName, sum(t.price) as totalMoney " +
                "FROM Transactions t " +
                "INNER JOIN Categories c " +
                "ON t.category_ID = c.category_ID " +
                "WHERE YEAR(t.date) = YEAR(CURRENT_DATE()) " +
                "AND MONTH(t.date) = MONTH(CURRENT_DATE()) " +
                "GROUP BY c.name ",
            nativeQuery = true
    )
    List<Object[]> getTransactionsFromCurrentMonth();

//    @Query()
//    List<Transaction> getMonthlyBalanceOfExpenses();
//
//    @Query()
//    List<Transaction> getMonthyBalanceOfIncomes();
}

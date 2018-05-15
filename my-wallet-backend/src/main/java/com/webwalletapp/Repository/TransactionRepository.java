package com.webwalletapp.Repository;

import com.webwalletapp.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
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
                "AND t.Type = 'Wydatek' " +
                "GROUP BY c.name ",
            nativeQuery = true
    )
    List<Object[]> getExpensesFromCurrentMonth();

    @Query("SELECT MONTHNAME(t.date) as monthName, CONCAT(YEAR(t.date), LPAD(MONTH(date), 2, '0')) as dateCode, " +
            "SUM(t.price) as balance, type FROM Transaction as t GROUP BY YEAR(t.date), MONTH(t.date), t.type " +
            "ORDER BY dateCode DESC, type DESC")
    List<Object[]> getMonthlyBalance();

    List<Transaction> findByType(String type);
    List<Transaction> findByTypeAndDateBetween(String type, LocalDate startDate, LocalDate endDate);

    @Transactional
    void deleteTransactionsByTransactionIdIn(int[] idsToDelete);
}

package edu.utn.stockabc.repository;

import edu.utn.stockabc.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query(value = "SELECT * FROM ARTICLES WHERE ZONE = 'B' OR ZONE = 'C'", nativeQuery = true)
    List<Article> getAllZonesBC ();

    @Query(value = "SELECT * FROM ARTICLES WHERE ZONE = 'A'", nativeQuery = true)
    List<Article> getAllZonesA ();
}

package edu.utn.stockabc.controller;

import edu.utn.stockabc.model.Article;
import edu.utn.stockabc.model.ArticleDTO;
import edu.utn.stockabc.model.Sale;
import edu.utn.stockabc.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.math3.stat.descriptive.moment.Mean;
import org.apache.commons.math3.stat.descriptive.moment.StandardDeviation;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("")
    public ResponseEntity<List<Article>> getAll(){
        try{
            List<Article> articles = articleRepository.findAll();
            return ResponseEntity.ok(articles);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/mean")
    public ResponseEntity<List<ArticleDTO>> getAllWithMean() {
        List<Article> articles = articleRepository.findAll();
        List<ArticleDTO> articlesDto = articles.stream()
                .map(article -> convertToDto(article))
                .collect(Collectors.toList());

        return ResponseEntity.ok(articlesDto);
    }

    private double getMean(List<Sale> sales) {
        Mean mean = new Mean();
        double[] array = new double[sales.size()];

        for (int i = 0; i < sales.size() ; i++) {
            array[i] = sales.get(i).getNumber();
        }

        return mean.evaluate(array);
    }

    private ArticleDTO convertToDto(Article article){
        return new ArticleDTO(
                article.getId(),
                article.getCode(),
                article.getName(),
                article.getPrice(),
                getMean(article.getSales())
                );
    }
}

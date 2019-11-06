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

import java.util.Comparator;
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
        categorizeArticles();
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

    private void categorizeArticles(){
        List<Article> articles = articleRepository.findAll();
        double averageConsumption = 0;
        double zoneA;
        double zoneB;
        double zoneC;

        // Get CAV of each article and average consumption
        for (Article article: articles) {
            double mean = getMean(article.getSales());
            article.setCav(article.getPrice() * mean);
            averageConsumption += mean;
        }

        // Sort articles by ordering from highest to lowest by CAV
        articles.sort(Comparator.comparing(Article::getCav).reversed());

        // Units of reference for each zone
        zoneA = averageConsumption * 20 / 100;
        zoneB = averageConsumption * 10 / 100;
        zoneC = averageConsumption * 70 / 100; // Unused value

        boolean gateA = true;
        boolean gateB = false;
        boolean gateC = false;
        double counter = 0;

        // Set articles to zones
        for (Article article: articles) {
            if(gateA || gateB) counter += getMean(article.getSales()); // Calculate mean only for zones A and B

            // Enter here only when there is space for articles in zone A
            if(gateA){
                if (counter < zoneA) article.setZone('A');
                else {
                    // Once zone A is complete
                    article.setZone('A'); // Set last article to zone A
                    gateA = false; // Change flags to stop loading articles to zone A, and start to zone B
                    gateB = true;
                    counter = 0; // Reset counter
                }
            }
            // Do not enter if filling A or C
            if(gateB){ // Do same for B
                if (counter < zoneB) article.setZone('B');
                else {
                    article.setZone('B');
                    gateB = false;
                    gateC = true;
                }
            }
            // Enter only when A and B are filled
            if(gateC){ // C doesn't need checks as the rest of the items should go here
                article.setZone('C');
            }
        }
    }

}
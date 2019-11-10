package edu.utn.stockabc.controller;

import edu.utn.stockabc.model.Article;
import edu.utn.stockabc.model.ArticleBarDTO;
import edu.utn.stockabc.model.ArticleDTO;
import edu.utn.stockabc.model.ArticlePQDTO;
import edu.utn.stockabc.model.ModelConfig;
import edu.utn.stockabc.model.Sale;
import edu.utn.stockabc.model.ZonesDTO;
import edu.utn.stockabc.repository.ArticleRepository;
import edu.utn.stockabc.repository.ModelConfigRepository;
import edu.utn.stockabc.util.NormalDistribution;
import org.apache.commons.math3.stat.descriptive.moment.StandardDeviation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.math3.stat.descriptive.moment.Mean;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/article", produces = "application/json")
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ModelConfigRepository modelConfigRepository;

    private double zoneA;
    private double zoneB;
    private double zoneC;

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

    @GetMapping("/zones")
    public ResponseEntity<ZonesDTO> getZones() {
        ZonesDTO zonesDTO = new ZonesDTO(zoneA, zoneB, zoneC);
        return ResponseEntity.ok(zonesDTO);
    }

    @GetMapping("/consumption")
    public ResponseEntity<List<ArticleBarDTO>> getArticlesConsumption() {
        List<Article> articles = articleRepository.findAll();
        List<ArticleBarDTO> articlesBarDto = articles.stream()
                .map(article -> convertToBarDto(article))
                .collect(Collectors.toList());

        articlesBarDto.sort(Comparator.comparing(ArticleBarDTO::getConsumption).reversed());

        return ResponseEntity.ok(articlesBarDto);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patch(@PathVariable("id") Integer id, @RequestBody Character zone){
        Article article = articleRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, String.format("Article not found for id: %s", id)));
        article.setZone(zone);
        articleRepository.save(article);

        return ResponseEntity.ok().build();
    }

    private ArticleDTO convertToDto(Article article){
        return new ArticleDTO(
                article.getId(),
                article.getCode(),
                article.getName(),
                article.getPrice(),
                article.getStock(),
                article.getSuplier(),
                Math.floor(getMean(article.getSales())* 100) / 100, // truncate to two decimals
                article.getZone()
                );
    }

    private ArticleBarDTO convertToBarDto(Article article){
        double consumption = getMean(article.getSales()) * article.getPrice();

        return new ArticleBarDTO(
                article.getCode(),
                Math.floor(consumption * 100) / 100 // truncate to two decimals
        );
    }

    private void categorizeArticles(){
        List<Article> articles = articleRepository.findAll();
        double averageConsumption = 0;

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
        zoneC = averageConsumption * 70 / 100;

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
            articleRepository.save(article);
        }
    }

    private double getMean(List<Sale> sales) {
        Mean mean = new Mean();
        double[] array = new double[sales.size()];

        // Convert list of sales to array of doubles
        for (int i = 0; i < sales.size() ; i++) {
            array[i] = sales.get(i).getNumber();
        }

        return mean.evaluate(array);
    }

    private double getStandardDeviation(List<Sale> sales) {
        StandardDeviation standardDeviation = new StandardDeviation();

        double[] array = new double[sales.size()];

        // Convert list of sales to array of doubles
        for (int i = 0; i < sales.size() ; i++) {
            array[i] = sales.get(i).getNumber();
        }

        return standardDeviation.evaluate(array);
    }

    @GetMapping("/modelp")
    public ResponseEntity<List<ArticlePQDTO>> calculateModelP(){
        List<Article> articles = articleRepository.getAllZonesBC();
        List<ArticlePQDTO> articlePQDTOList = new ArrayList<>();
        NormalDistribution normalDistribution = new NormalDistribution();
        ModelConfig modelConfig;
        double dailyDemand;
        double standardDeviation;
        double deviationTL;
        double expectedValue; // Esperanza
        double z;
        double optimalLot;
        double securityReserve;
        double totalAnnualCost;
        double annualManteinanceCost;

        for (Article article: articles) {
            modelConfig = modelConfigRepository.getBySupplierName(article.getSuplier());
            standardDeviation = getStandardDeviation(article.getSales());
            dailyDemand = getMean(article.getSales());

            deviationTL = Math.sqrt((modelConfig.getReviewPeriod() + modelConfig.getDeliveryTime())) * standardDeviation;

            expectedValue = dailyDemand * modelConfig.getReviewPeriod() * (1 - (modelConfig.getSatisfaction()/100));
            expectedValue = expectedValue / deviationTL;

            z = normalDistribution.getNormalDistribution(expectedValue);

            optimalLot = dailyDemand * (modelConfig.getReviewPeriod() + modelConfig.getDeliveryTime());
            securityReserve = z * deviationTL;
            optimalLot = optimalLot + securityReserve;
            optimalLot = optimalLot - article.getStock();
            optimalLot = Math.ceil(optimalLot); // Round up

            annualManteinanceCost = (optimalLot / 2) * modelConfig.getStorageCost();
            annualManteinanceCost = annualManteinanceCost + securityReserve * modelConfig.getStorageCost();
            annualManteinanceCost = Math.floor(annualManteinanceCost * 100) / 100;

            /*totalAnnualCost = (dailyDemand * 230 * article.getPrice());
            totalAnnualCost = totalAnnualCost + ((optimalLot / 2) * modelConfig.getStorageCost());
            totalAnnualCost = Math.floor(totalAnnualCost * 100) / 100;*/

            ArticlePQDTO articlePQDTO = new ArticlePQDTO(
                    article.getCode(),
                    article.getName(),
                    article.getPrice(),
                    article.getStock(),
                    (int)Math.ceil(securityReserve),
                    article.getSuplier(),
                    (int)optimalLot,
                    LocalDate.now().plusDays(modelConfig.getReviewPeriod()), // Set next delivery for product
                    article.getZone(),
                    annualManteinanceCost,
                    0 // Not necesary for Model P
            );

            articlePQDTOList.add(articlePQDTO);
        }

        return ResponseEntity.ok(articlePQDTOList);
    }

    @GetMapping("/modelq")
    public ResponseEntity<List<ArticlePQDTO>> calculateModelQ(){
        List<Article> articles = articleRepository.getAllZonesA();
        List<ArticlePQDTO> articlePQDTOList = new ArrayList<>();
        NormalDistribution normalDistribution = new NormalDistribution();
        ModelConfig modelConfig;
        double dailyDemand;
        double annualDemand;
        double standardDeviation;
        double deviationL;
        double expectedValue; // Esperanza
        double z;
        double optimalLot;
        double securityReserve;
        double totalAnnualCost;
        double annualManteinanceCost;
        double reorderPoint;

        for (Article article: articles) {
            modelConfig = modelConfigRepository.getBySupplierName(article.getSuplier());
            standardDeviation = getStandardDeviation(article.getSales());
            dailyDemand = getMean(article.getSales());
            annualDemand = dailyDemand * 365;

            optimalLot = Math.sqrt((2 * annualDemand * modelConfig.getDeliveryCost()) / modelConfig.getStorageCost());

            deviationL = Math.sqrt(modelConfig.getDeliveryTime()) * standardDeviation;
            expectedValue = (1 - (modelConfig.getSatisfaction() / 100)) * (optimalLot / deviationL);
            z = normalDistribution.getNormalDistribution(expectedValue);

            securityReserve = z * deviationL;
            reorderPoint = dailyDemand * modelConfig.getDeliveryTime();
            reorderPoint = reorderPoint + securityReserve;

            optimalLot = Math.ceil(optimalLot);
            reorderPoint = Math.ceil(reorderPoint);
            securityReserve = Math.ceil(securityReserve);

            annualManteinanceCost = (optimalLot / 2) * modelConfig.getStorageCost();
            annualManteinanceCost = annualManteinanceCost + securityReserve * modelConfig.getStorageCost();
            annualManteinanceCost = Math.floor(annualManteinanceCost * 100) / 100;

            /*totalAnnualCost = annualDemand * article.getPrice();
            totalAnnualCost = totalAnnualCost + ((annualDemand * modelConfig.getDeliveryCost()) / optimalLot);
            totalAnnualCost = totalAnnualCost + (optimalLot * modelConfig.getStorageCost() / 2);
            totalAnnualCost = totalAnnualCost + (securityReserve * modelConfig.getStorageCost());
            totalAnnualCost = Math.floor(totalAnnualCost * 100) / 100;*/

            ArticlePQDTO articlePQDTO = new ArticlePQDTO(
                    article.getCode(),
                    article.getName(),
                    article.getPrice(),
                    article.getStock(),
                    (int)securityReserve,
                    article.getSuplier(),
                    (int)optimalLot,
                    LocalDate.now(),
                    article.getZone(),
                    annualManteinanceCost,
                    (int)reorderPoint
            );

            articlePQDTOList.add(articlePQDTO);
        }

        return ResponseEntity.ok(articlePQDTOList);
    }
}

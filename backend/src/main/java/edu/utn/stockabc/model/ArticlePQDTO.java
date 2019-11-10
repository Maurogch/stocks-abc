package edu.utn.stockabc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticlePQDTO {
    private int code;
    private String name;
    private double price;
    private int stock;
    private int securityReserve;
    private String supplier;
    private int optimalLot;
    private LocalDate nextRevition;
    private char zone;
    private double annualManteinanceCost;
    private int reorderPoint;
}
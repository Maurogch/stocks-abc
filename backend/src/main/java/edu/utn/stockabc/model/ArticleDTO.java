package edu.utn.stockabc.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDTO {
    private int id;
    private int code;
    private String name;
    private double price;
    private int stock;
    private double mean;
    private char zone;
}

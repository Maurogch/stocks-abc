package edu.utn.stockabc.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Data
@Entity
@Table(name = "ARTICLES")
public class Article {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "CODE")
    private Integer code;

    @Column(name = "NAME")
    private String name;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "SUPPLIER")
    private String suplier;

    @Column(name = "STOCK")
    private Integer stock;

    @Column(name = "ZONE")
    private Character zone;

    @Transient
    private double cav;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "article")
    @ToString.Exclude
    @JsonManagedReference
    private List<Sale> sales;
}

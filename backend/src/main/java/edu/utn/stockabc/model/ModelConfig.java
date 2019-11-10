package edu.utn.stockabc.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "MODELCONFIGS")
public class ModelConfig {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "REVIEW_PERIOD")
    private int reviewPeriod;

    @Column(name = "DELIVERY_TIME")
    private int deliveryTime;

    @Column(name = "LAST_DELIVERY")
    private LocalDate lastDelivery;

    @Column(name = "SUPPLIER")
    private String supplier;

    @Column(name = "SATISFACTION")
    private double satisfaction;

    @Column(name = "STORAGE_COST")
    private double storageCost;

    @Column(name = "DELIVERY_COST")
    private double deliveryCost;
}

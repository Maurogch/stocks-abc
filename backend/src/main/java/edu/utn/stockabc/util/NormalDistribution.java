package edu.utn.stockabc.util;

import java.util.Map;
import java.util.TreeMap;

public class NormalDistribution {
    private TreeMap<Double,Double> map;

    public NormalDistribution() {
        this.map = new TreeMap<>();

        map.put(3.000, -3.00);
        map.put(2.901, -2.90);
        map.put(2.801, -2.80);
        map.put(2.701, -2.70);
        map.put(2.601, -2.60);
        map.put(2.502, -2.50);
        map.put(2.403, -2.40);
        map.put(2.303, -2.30);
        map.put(2.205, -2.20);
        map.put(2.106, -2.10);
        map.put(2.008, -2.00);
        map.put(1.911, -1.90);
        map.put(1.814, -1.80);
        map.put(1.718, -1.70);
        map.put(1.623, -1.60);
        map.put(1.529, -1.50);
        map.put(1.346, -1.30);
        map.put(1.256, -1.20);
        map.put(1.169, -1.10);
        map.put(1.083, -1.00);
        map.put(1.000, -0.90);
        map.put(0.920, -0.80);
        map.put(0.843, -0.70);
        map.put(0.769, -0.60);
        map.put(0.698, -0.50);
        map.put(0.630, -0.40);
        map.put(0.567, -0.30);
        map.put(0.507, -0.20);
        map.put(0.451, -0.10);
        map.put(0.399, 0.00);
        map.put(0.351, 0.10);
        map.put(0.307, 0.20);
        map.put(0.267, 0.30);
        map.put(0.230, 0.40);
        map.put(0.198, 0.50);
        map.put(0.169, 0.60);
        map.put(0.143, 0.70);
        map.put(0.120, 0.80);
        map.put(0.100, 0.90);
        map.put(0.083, 1.00);
        map.put(0.069, 1.10);
        map.put(0.056, 1.20);
        map.put(0.046, 1.30);
        map.put(0.037, 1.40);
        map.put(0.029, 1.50);
        map.put(0.023, 1.60);
        map.put(0.018, 1.70);
        map.put(0.014, 1.80);
        map.put(0.011, 1.90);
        map.put(0.008, 2.00);
        map.put(0.006, 2.10);
        map.put(0.005, 2.20);
        map.put(0.004, 2.30);
        map.put(0.003, 2.40);
        map.put(0.002, 2.50);
        map.put(0.00110, 2.60);
        map.put(0.00107, 2.70);
        map.put(0.00104, 2.80);
        map.put(0.001, 2.90);
    }

    public double getNormalDistribution(double key) throws NullPointerException{
        Double res = null;

        if(key > 3.0){
            res = -key;
        } else if (key < 0.001){
            res = 3.0;
        } else {
            Map.Entry<Double, Double> low = map.floorEntry(key);
            Map.Entry<Double, Double> high = map.ceilingEntry(key);

            if (low != null && high != null) {
                res = Math.abs(key - low.getKey()) < Math.abs(key - high.getKey())
                        ? low.getValue()
                        : high.getValue();
            } else if (low != null || high != null) {
                res = low != null ? low.getValue() : high.getValue();
            }
        }

        return res;
    }
}

package edu.utn.stockabc.repository;

import edu.utn.stockabc.model.ModelConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelConfigRepository  extends JpaRepository<ModelConfig, Integer> {
    @Query(value = "SELECT * FROM MODELCONFIGS WHERE SUPPLIER = ?1", nativeQuery = true)
    ModelConfig getBySupplierName(String supplier);
}

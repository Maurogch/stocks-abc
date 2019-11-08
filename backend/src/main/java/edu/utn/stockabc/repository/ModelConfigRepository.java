package edu.utn.stockabc.repository;

import edu.utn.stockabc.model.ModelConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelConfigRepository  extends JpaRepository<ModelConfig, Integer> {
}

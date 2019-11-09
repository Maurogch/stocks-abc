package edu.utn.stockabc.controller;

import edu.utn.stockabc.model.ModelConfig;
import edu.utn.stockabc.repository.ModelConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequestMapping(value = "/modelconfig", produces = "application/json")
public class ModelConfigController {
    @Autowired
    private ModelConfigRepository modelConfigRepository;

    @GetMapping("")
    public ResponseEntity<List<ModelConfig>> getAll(){
        try{
            List<ModelConfig> modelConfigs = modelConfigRepository.findAll();
            return ResponseEntity.ok(modelConfigs);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Integer id, @RequestBody ModelConfig modelConfigNew){
        ModelConfig modelConfigOld = modelConfigRepository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, String.format("Player not found for id: %s", id)));

        modelConfigNew.setId(modelConfigOld.getId());
        modelConfigNew.setSupplier(modelConfigOld.getSupplier());

        modelConfigRepository.save(modelConfigNew);
    }
}

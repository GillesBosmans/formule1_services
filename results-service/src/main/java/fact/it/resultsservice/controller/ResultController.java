package fact.it.resultsservice.controller;


import fact.it.resultsservice.model.Result;
import fact.it.resultsservice.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import fact.it.resultsservice.dto.ResultRequest;
import fact.it.resultsservice.dto.ResultResponse;

import java.util.List;

@RestController
@RequestMapping("/api/result")
@RequiredArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ResultResponse> getAllResults(){
        return resultService.getResults();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultResponse> getResultById(@PathVariable String id) {
        try {
            ResultResponse response = resultService.getResultById(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



    @PostMapping
    public ResponseEntity<Result> addResult(@RequestBody ResultRequest resultRequest) {
        Result response = resultService.addResult(resultRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

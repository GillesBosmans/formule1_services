package fact.it.resultsservice.controller;


import fact.it.resultsservice.model.Result;
import fact.it.resultsservice.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/result")
@RequiredArgsConstructor
public class ResultController {
    private final ResultService resultService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Result> getAllResults(){
        return resultService.getResults();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<Result> getResultById(@PathVariable String id) {
        return resultService.getResultById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void addResult(@RequestBody Result result) {
        resultService.addResult(result);
    }
}

package fact.it.resultsservice.repository;

import fact.it.resultsservice.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResultRepository extends MongoRepository<Result, String>{
}

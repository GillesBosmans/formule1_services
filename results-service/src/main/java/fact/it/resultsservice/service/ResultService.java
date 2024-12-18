package fact.it.resultsservice.service;

import fact.it.resultsservice.dto.ResultRequest;
import fact.it.resultsservice.dto.ResultResponse;
import fact.it.resultsservice.model.Result;
import fact.it.resultsservice.repository.ResultRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;

    @PostConstruct
    public void loadData() {
        if (resultRepository.count() <= 0) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            try {
                List<Result> f1Results2023 = List.of(
                        new Result("Bahrain-2023", 1, dateFormat.parse("05/03/2023"), List.of(
                                new Result.DriverResult(1, 1, false, 57, new BigDecimal("25")),
                                new Result.DriverResult(11, 2, true, 57, new BigDecimal("18")),
                                new Result.DriverResult(16, 3, false, 57, new BigDecimal("15")),
                                new Result.DriverResult(55, 4, false, 57, new BigDecimal("12")),
                                new Result.DriverResult(63, 5, false, 57, new BigDecimal("10")),
                                new Result.DriverResult(14, 6, false, 57, new BigDecimal("8")),
                                new Result.DriverResult(44, 7, false, 57, new BigDecimal("6")),
                                new Result.DriverResult(18, 8, false, 57, new BigDecimal("4")),
                                new Result.DriverResult(31, 9, false, 57, new BigDecimal("2")),
                                new Result.DriverResult(10, 10, false, 57, new BigDecimal("1")),
                                new Result.DriverResult(22, 11, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(77, 12, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(24, 13, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(27, 14, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(20, 15, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(21, 16, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(23, 17, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(4, 18, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(6, 19, false, 57, BigDecimal.ZERO),
                                new Result.DriverResult(2, 20, false, 57, BigDecimal.ZERO)
                        )),
                        new Result("Spain-2023", 7, dateFormat.parse("04/06/2023"), List.of(
                                new Result.DriverResult(1, 1, false, 66, new BigDecimal("25")),
                                new Result.DriverResult(11, 2, true, 66, new BigDecimal("18")),
                                new Result.DriverResult(16, 3, false, 66, new BigDecimal("15")),
                                new Result.DriverResult(55, 4, false, 66, new BigDecimal("12")),
                                new Result.DriverResult(63, 5, false, 66, new BigDecimal("10")),
                                new Result.DriverResult(14, 6, false, 66, new BigDecimal("8")),
                                new Result.DriverResult(44, 7, false, 66, new BigDecimal("6")),
                                new Result.DriverResult(18, 8, false, 66, new BigDecimal("4")),
                                new Result.DriverResult(31, 9, false, 66, new BigDecimal("2")),
                                new Result.DriverResult(10, 10, false, 66, new BigDecimal("1")),
                                new Result.DriverResult(22, 11, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(77, 12, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(24, 13, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(27, 14, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(20, 15, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(21, 16, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(23, 17, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(4, 18, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(6, 19, false, 66, BigDecimal.ZERO),
                                new Result.DriverResult(2, 20, false, 66, BigDecimal.ZERO)
                        )),
                        new Result("Canada-2023", 8, dateFormat.parse("18/06/2023"), List.of(
                                new Result.DriverResult(1, 1, false, 70, new BigDecimal("25")),
                                new Result.DriverResult(11, 2, true, 70, new BigDecimal("18")),
                                new Result.DriverResult(16, 3, false, 70, new BigDecimal("15")),
                                new Result.DriverResult(55, 4, false, 70, new BigDecimal("12")),
                                new Result.DriverResult(63, 5, false, 70, new BigDecimal("10")),
                                new Result.DriverResult(14, 6, false, 70, new BigDecimal("8")),
                                new Result.DriverResult(44, 7, false, 70, new BigDecimal("6")),
                                new Result.DriverResult(18, 8, false, 70, new BigDecimal("4")),
                                new Result.DriverResult(31, 9, false, 70, new BigDecimal("2")),
                                new Result.DriverResult(10, 10, false, 70, new BigDecimal("1")),
                                new Result.DriverResult(22, 11, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(77, 12, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(24, 13, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(27, 14, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(20, 15, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(21, 16, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(23, 17, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(4, 18, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(6, 19, false, 70, BigDecimal.ZERO),
                                new Result.DriverResult(2, 20, false, 70, BigDecimal.ZERO)
                        ))
                );

                resultRepository.saveAll(f1Results2023);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public List<ResultResponse> getResults(){
        return resultRepository.findAll().stream().map(this::mapResultResponse).toList();
    }

    public Result addResult(ResultRequest resultRequest) {
        Result result = Result.builder()
                .id(resultRequest.getId())
                .trackId(resultRequest.getTrackId())
                .date(resultRequest.getDate())
                .results(resultRequest.getResults().stream()
                        .map(r -> Result.DriverResult.builder()
                                .carNumber(r.getCarNumber())
                                .position(r.getPosition())
                                .fastestLap(r.isFastestLap())
                                .lapsCompleted(r.getLapsCompleted())
                                .points(r.getPoints())
                                .build())
                        .toList())
                .build();

        return resultRepository.save(result);
    }

    public ResultResponse getResultById(String id) {
        return resultRepository.findById(id)
                .map(this::mapResultResponse)
                .orElseThrow(() -> new RuntimeException("Result not found"));
    }

    // DTO
    private ResultResponse mapResultResponse(Result result) {
        return ResultResponse.builder()
                .id(result.getId())
                .trackId(result.getTrackId())
                .date(result.getDate())
                .results(result.getResults().stream()
                        .map(r -> ResultResponse.DriverResultResponse.builder()
                                .carNumber(r.getCarNumber())
                                .position(r.getPosition())
                                .points(r.getPoints())
                                .build())
                        .toList())
                .build();
    }
}

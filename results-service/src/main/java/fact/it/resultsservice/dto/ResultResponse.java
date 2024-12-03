package fact.it.resultsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResultResponse {
    private String id;
    private Integer trackId;
    private Date date;
    private List<DriverResultResponse> results;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DriverResultResponse {
        private Integer carNumber;
        private Integer position;
        private BigDecimal points;
    }
}

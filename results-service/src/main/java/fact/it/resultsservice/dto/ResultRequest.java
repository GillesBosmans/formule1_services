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
public class ResultRequest {
    private String id;
    private Integer trackId;
    private Date date;
    private List<DriverResultRequest> results;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DriverResultRequest {
        private Integer carNumber;
        private Integer position;
        private boolean fastestLap;
        private Integer lapsCompleted;
        private BigDecimal points;
    }
}

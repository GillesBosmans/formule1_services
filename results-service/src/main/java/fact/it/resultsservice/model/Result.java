package fact.it.resultsservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Document(collection = "results")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Result {

    @Id
    private String id;
    private Integer trackId;
    private Date date;
    private List<DriverResult> results;

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Data
    public static class DriverResult {

        private Integer carNumber;
        private Integer position;
        private boolean fastestLap;
        private Integer lapsCompleted;
        private BigDecimal points;
    }
}


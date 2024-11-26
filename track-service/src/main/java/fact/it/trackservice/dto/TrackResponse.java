package fact.it.trackservice.dto;

import jakarta.persistence.Entity;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackResponse {
    private Long id;
    private String trackName;
    private String location;
    private String country;
    private double trackLengthKm;
    private int numberOfTurns;
}

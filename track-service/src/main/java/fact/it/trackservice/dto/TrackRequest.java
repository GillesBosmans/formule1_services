package fact.it.trackservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackRequest {
    private String trackName;
    private String location;
    private String country;
    private double trackLengthKm;
    private int numberOfTurns;
}

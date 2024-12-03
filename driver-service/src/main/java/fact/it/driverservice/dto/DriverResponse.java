package fact.it.driverservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DriverResponse {
    private Long id;
    private String teamId;
    private String firstName;
    private String lastName;
    private String nationality;
    private Integer carNumber;
    private Integer championshipsWon;
}

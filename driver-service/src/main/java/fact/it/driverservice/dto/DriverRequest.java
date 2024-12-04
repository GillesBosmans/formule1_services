package fact.it.driverservice.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class DriverRequest {
    private String teamId;
    private String firstName;
    private String lastName;
    private String nationality;
    private Integer carNumber;
    private Integer championshipsWon;
}

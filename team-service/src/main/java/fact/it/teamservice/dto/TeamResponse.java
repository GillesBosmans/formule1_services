package fact.it.teamservice.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamResponse {
    private Long id;
    private String teamAbbreviation;
    private String teamName;
    private String baseLocation;
    private String teamPrincipal;
    private Integer yearEstablished;
    private Integer championshipsWon;
}
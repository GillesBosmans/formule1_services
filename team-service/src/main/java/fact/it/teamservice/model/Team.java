package fact.it.teamservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="teams")
public class Team {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String teamAbbreviation;
    private String teamName;
    private String baseLocation;
    private String teamPrincipal;
    private int yearEstablished;
    private int championshipsWon;
}

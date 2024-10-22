package fact.it.driverservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String teamId;
    private String firstName;
    private String lastName;
    private String nationality;
    private Integer carNumber;
    private Integer championshipsWon;
}

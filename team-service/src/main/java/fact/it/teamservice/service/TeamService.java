package fact.it.teamservice.service;


import fact.it.teamservice.dto.TeamByIdResponse;
import fact.it.teamservice.dto.TeamRequest;
import fact.it.teamservice.dto.TeamResponse;
import fact.it.teamservice.model.Team;
import fact.it.teamservice.repository.TeamRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;

    @PostConstruct
    public void loadData(){
        if (teamRepository.count() == 0) {
            List<Team> f1Teams2023 = List.of(
                    new Team(null,"RED", "Red Bull Racing", "Milton Keynes, UK", "Christian Horner", 2005, 5),
                    new Team(null,"FER", "Ferrari", "Maranello, Italy", "Frédéric Vasseur", 1950, 16),
                    new Team(null,"MER", "Mercedes", "Brackley, UK", "Toto Wolff", 1954, 8),
                    new Team(null,"AST", "Aston Martin", "Silverstone, UK", "Mike Krack", 2018, 0),
                    new Team(null,"MCL", "McLaren", "Woking, UK", "Andrea Stella", 1966, 8),
                    new Team(null,"ALP", "Alpine", "Enstone, UK", "Otmar Szafnauer", 1981, 2),
                    new Team(null,"ALF", "Alfa Romeo", "Hinwil, Switzerland", "Alessandro Alunni Bravi", 1983, 0),
                    new Team(null,"HAA", "Haas", "Kannapolis, USA", "Guenther Steiner", 2016, 0),
                    new Team(null,"ALT", "AlphaTauri", "Faenza, Italy", "Franz Tost", 2006, 1),
                    new Team(null,"WIL", "Williams", "Grove, UK", "James Vowles", 1977, 9)
            );

            teamRepository.saveAll(f1Teams2023);
        }
    }

    // Get all teams
    public List<TeamResponse> getAllTeams() {

        List<Team> teams = teamRepository.findAll();
        return teams.stream().map(this::mapToTeamResponse).toList();
    }

    // Get a single team by ID
    public Optional<TeamByIdResponse> getTeamById(Long id) {

        return teamRepository.findById(id).map(this::mapToTeamByIdResponse);
    }

    // Create a new team
    public TeamResponse saveTeam(TeamRequest teamRequest) {
        // Convert TeamRequest to Team object
        Team team = Team.builder()
                .teamAbbreviation(teamRequest.getTeamAbbreviation())
                .teamName(teamRequest.getTeamName())
                .baseLocation(teamRequest.getBaseLocation())
                .teamPrincipal(teamRequest.getTeamPrincipal())
                .yearEstablished(teamRequest.getYearEstablished())
                .championshipsWon(teamRequest.getChampionshipsWon())
                .build();
        teamRepository.save(team);
        return mapToTeamResponse(team);
    }

    // Update an existing team
    public Team updateTeam(Long id, TeamRequest updatedTeam) {
        return teamRepository.findById(id)
                .map(team -> {
                    // Update team object with values from TeamRequest
                    team.setTeamAbbreviation(updatedTeam.getTeamAbbreviation());
                    team.setTeamName(updatedTeam.getTeamName());
                    team.setBaseLocation(updatedTeam.getBaseLocation());
                    team.setTeamPrincipal(updatedTeam.getTeamPrincipal());
                    team.setYearEstablished(updatedTeam.getYearEstablished());
                    team.setChampionshipsWon(updatedTeam.getChampionshipsWon());
                    return teamRepository.save(team);
                })
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    //DTO
    private TeamResponse mapToTeamResponse(Team team) {
        return TeamResponse.builder()
                .id(team.getId())
                .teamName(team.getTeamName())
                .teamAbbreviation(team.getTeamAbbreviation())
                .teamPrincipal(team.getTeamPrincipal())
                .baseLocation(team.getBaseLocation())
                .championshipsWon(team.getChampionshipsWon())
                .yearEstablished(team.getYearEstablished())
                .build();
    }

    private TeamByIdResponse mapToTeamByIdResponse(Team team) {
        return TeamByIdResponse.builder()
                .teamName(team.getTeamName())
                .teamAbbreviation(team.getTeamAbbreviation())
                .teamPrincipal(team.getTeamPrincipal())
                .baseLocation(team.getBaseLocation())
                .championshipsWon(team.getChampionshipsWon())
                .yearEstablished(team.getYearEstablished())
                .build();
    }
}

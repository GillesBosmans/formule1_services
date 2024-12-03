package fact.it.teamservice.controller;


import fact.it.teamservice.dto.TeamByIdResponse;
import fact.it.teamservice.dto.TeamRequest;
import fact.it.teamservice.dto.TeamResponse;
import fact.it.teamservice.model.Team;
import fact.it.teamservice.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @GetMapping
    public List<TeamResponse> getAllTeams(){return teamService.getAllTeams();}

    @GetMapping("/{id}")
    public ResponseEntity<TeamByIdResponse> getTeamById(@PathVariable Long id){
        Optional<TeamByIdResponse> team = teamService.getTeamById(id);
        return team.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create a new team
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody TeamRequest teamRequest) {
        Team createdTeam = teamService.saveTeam(teamRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeam);
    }

    // Update an existing team
    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody TeamRequest updatedTeamRequest) {
        try {
            Team updatedTeam = teamService.updateTeam(id, updatedTeamRequest);
            return ResponseEntity.ok(updatedTeam);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

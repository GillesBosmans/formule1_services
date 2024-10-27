package fact.it.teamservice.controller;


import fact.it.teamservice.model.Team;
import fact.it.teamservice.service.TeamService;
import lombok.RequiredArgsConstructor;
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
    public List<Team> getAllTeams(){return teamService.getAllTeams();}

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id){
        Optional<Team> team = teamService.getTeamById(id);
        return team.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Team createTeam(@RequestBody Team team){return teamService.saveTeam(team);}

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team updatedTeam){
        try {
            Team team = teamService.updateTeam(id, updatedTeam);
            return ResponseEntity.ok(team);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
}

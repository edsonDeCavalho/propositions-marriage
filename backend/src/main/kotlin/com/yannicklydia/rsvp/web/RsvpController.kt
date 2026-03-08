package com.yannicklydia.rsvp.web

import com.yannicklydia.rsvp.model.Enfant
import com.yannicklydia.rsvp.model.RsvpEntity
import com.yannicklydia.rsvp.model.RsvpRequest
import com.yannicklydia.rsvp.repository.RsvpRepository
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.Instant

@RestController
@RequestMapping("/api/rsvp")
@CrossOrigin(
    origins = [
        "http://localhost:90",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://51.178.142.95:90",
        "https://v1marige.shareprinto.com"
    ],
    allowedHeaders = ["*"],
    methods = [RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS]
)
class RsvpController(
    private val repository: RsvpRepository,
) {

    private val logger = LoggerFactory.getLogger(RsvpController::class.java)

    @PostMapping
    fun create(@RequestBody body: RsvpRequest): ResponseEntity<Any> {
        val nom = (body.name ?: body.nom)?.trim()
        if (nom.isNullOrBlank()) {
            return ResponseEntity.badRequest().body(mapOf("error" to "Le nom est requis")) 
        }

        val presence = body.attendance ?: body.presence
        val plusUnFlag = body.plusUn == true

        val enfants: List<Enfant> =
            body.enfants?.filter { !it.prenom.isBlank() || !it.age.isBlank() } ?: emptyList()

        val entity = RsvpEntity(
            id = null,
            date = Instant.now(),
            version = body.version ?: "version1",
            nom = nom,
            email = body.email,
            telephone = body.telephone,
            presence = presence,
            plusUn = plusUnFlag,
            plusUnNom = body.plusUnNom,
            plusUnRelation = body.plusUnRelation,
            preferencesAlimentaires = body.dietary ?: body.preferencesAlimentaires,
            aDesEnfants = body.hasEnfants,
            enfants = enfants,
            message = body.message,
            organiserSurprise = body.organiserSurprise,
        )

        val saved = repository.save(entity)
        logger.info("Nouvelle réponse RSVP enregistrée: id={}, nom={}", saved.id, saved.nom)
        return ResponseEntity.status(HttpStatus.CREATED).body(mapOf("ok" to true, "id" to saved.id))
    }

    @GetMapping
    fun list(): List<RsvpEntity> =
        repository.findAll().sortedByDescending { it.date }
}


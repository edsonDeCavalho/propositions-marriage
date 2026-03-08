package com.yannicklydia.rsvp.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "rsvp")
data class RsvpEntity(
    @Id
    val id: String? = null,
    val date: Instant = Instant.now(),
    val version: String? = null,
    val nom: String,
    val email: String? = null,
    val telephone: String? = null,
    val presence: String? = null,
    val plusUn: Boolean = false,
    val plusUnNom: String? = null,
    val plusUnRelation: String? = null,
    val preferencesAlimentaires: String? = null,
    val aDesEnfants: String? = null,
    val enfants: List<Enfant> = emptyList(),
    val message: String? = null,
    val organiserSurprise: Boolean? = null,
)


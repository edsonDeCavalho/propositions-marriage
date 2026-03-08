package com.yannicklydia.rsvp.model

data class RsvpRequest(
    val name: String? = null,
    val nom: String? = null,
    val email: String? = null,
    val telephone: String? = null,
    val attendance: String? = null,
    val presence: String? = null,
    val plusUn: Boolean? = null,
    val plusUnNom: String? = null,
    val plusUnRelation: String? = null,
    val dietary: String? = null,
    val preferencesAlimentaires: String? = null,
    val hasEnfants: String? = null,
    val enfants: List<Enfant>? = null,
    val message: String? = null,
    val organiserSurprise: Boolean? = null,
    val version: String? = null,
)


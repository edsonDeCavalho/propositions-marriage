package com.yannicklydia.rsvp.repository

import com.yannicklydia.rsvp.model.RsvpEntity
import org.springframework.data.mongodb.repository.MongoRepository

interface RsvpRepository : MongoRepository<RsvpEntity, String>


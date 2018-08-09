const mongoose = require('mongoose')

/**
 * InnovationEntitySchema
 *
 * mongoose schema
 *
 * The configuration for a schema that models what an innovationEntity looks like.
 */
const InnovationEntitySchema = new mongoose.Schema({
  /**
   * pointOfContact
   *
   * string
   *
   * The main point of contact for the individual entity.
   */
  pointOfContact: {
    type: String,
    required: true
  },

  /**
   * pointOfContactEmail
   *
   * string
   *
   * The main email for the point of contact for the organization.
   */
  pointOfContactEmail: {
    type: String,
    required: true
  },

  /**
   * duAffiliation
   *
   * string
   *
   * How is the innovation entity connected to DU.
   */
  duAffiliation: {
    type: String,
    required: true
  },

  /**
   * description
   *
   * string
   *
   * A provided description about the innovation entity and how it is involved in the community.
   */
  description: {
    type: String,
    required: true
  },

  /**
   * website
   *
   * string
   *
   * A link to learn more about the organization.
   */
  website: {
    type: String,
    required: true
  },

  /**
   * physicalLocation
   *
   * string
   *
   * Where is the organization physically located on campus.
   */
  physicalLocation: {
    type: String,
    required: true
  },

  /**
   * innovationDescription
   *
   * string
   *
   * Why is this organization innovative? Why does it belong here?
   */
  innovationDescription: {
    type: String,
    required: true
  }
})

// Create a new model using the configured schema
const InnovationEntityModel = mongoose.model(
  'InnovationEntity',
  InnovationEntitySchema
)

module.exports = {
  InnovationEntitySchema,
  InnovationEntityModel
}

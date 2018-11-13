const mongoose = require('mongoose');

/**
 * OrganizationSchema
 *
 * mongoose schema
 *
 * The configuration for a schema that models what an organization looks like.
 */
const OrganizationSchema = new mongoose.Schema({
  /**
   * name
   *
   * string
   *
   * The name of the organization or entity.
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * pointOfContact
   *
   * string
   *
   * The main point of contact for the individual entity.
   */
  pointOfContact: {
    type: String,
    required: true,
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
    required: true,
  },

  /**
   * duAffiliation
   *
   * Array<string>
   *
   * How is the innovation entity connected to DU.
   */
  duAffiliation: [{
    type: String,
    required: true,
  }],

  /**
   * description
   *
   * string
   *
   * A provided description about the innovation entity and how it is involved in the community.
   */
  description: {
    type: String,
    required: false,
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
    required: false,
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
    required: false,
  },

  /**
   * location
   *
   * object
   *
   * A more "under-the-hood" version of storing the location. We don't display this to users, but we
   *  use it to show the locations of the organizations on the map.
   */
  location: {
    lat: {
      type: Number,
      required: true,
      // The default latitude of DU
      default: 39.676654,
    },
    lng: {
      type: Number,
      required: true,
      // The default longitude of DU
      default: -104.962203,
    },
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
    required: true,
  },

  /**
   * innovationCategory
   *
   * Object
   *
   * The type of category the innovation organization best fits into. Used for advanced filtering.
   */
  innovationCategory: {
    type: Object,
    required: true,
  },

  /**
   * image
   *
   * String
   *
   * A url representing an image that can be used as a background image for the innovation resource.
   */
  image: {
    type: String,
    required: false,
  },
});

// Create a new model using the configured schema
const OrganizationModel = mongoose.model(
  'OrganizationModel',
  OrganizationSchema,
);

module.exports = {
  OrganizationSchema,
  OrganizationModel,
};

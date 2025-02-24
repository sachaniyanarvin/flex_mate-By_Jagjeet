const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    YourimageLink: String,
    "1stNote": String,
    "2ndNote": String,
    Header: String,
    WorkDescription: String,
    SkillsHeader: String,
    SkillsHeaderDescription: String,
    "1stskill": [String],
    "2ndskill": [String],
    "3rdskill": [String],
    YourLatestProjectLink: String,
    YourLatestProjectLinkDescription: String,
    AboutYou: String,
    skillsPhoto: String,
    projectLink: String,
    projectOwner: String,
    likes: Number,
});

const PortfolioModel = mongoose.model('Portfolio', portfolioSchema);

module.exports = PortfolioModel;
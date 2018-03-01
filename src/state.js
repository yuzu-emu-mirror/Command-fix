/* Application State */
var State = function () {
  this.guild = null;
  this.logChannel = null;
  this.responses = null;
  this.stats = {
    joins: 0,
    ruleAccepts: 0,
    leaves: 0
  };
};

module.exports = new State();

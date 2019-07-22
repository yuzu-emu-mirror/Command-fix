class UserWarning {
  constructor (id, username, warnedBy, warnedByUsername, priorWarnings, silent) {
    this.id = id
    this.username = username
    this.date = new Date()
    this.warnedBy = warnedBy
    this.warnedByUsername = warnedByUsername
    this.priorWarnings = priorWarnings
    this.silent = silent
  }
}

module.exports = UserWarning;

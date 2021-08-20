module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return 'Day must have a name(day-title).'
      }
      const [day, title] = value.split('-')
      if (isNaN(day)) {
        return 'Day must start with number'
      }
      if (!title || !title.length) {
        return 'Day must have a name(day-title).'
      }
      return true
    },
  },
]

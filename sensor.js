class Sensor {
    constructor(description, id, lat, lng, place, readonly, state_code, value) {
      this.description = description
      this.id = id
      this.lat = lat
      this.lng = lng
      this.place = place
      this.readonly = readonly
      this.state_code = state_code
      this.value = value
    }
  }
  
  function JSONToSensor(jsonObject) {
    const {
      description: description,
      id: id,
      lat: lat,
      lng: lng,
      place: place,
      readonly: readonly,
      state_code: state_code,
      value: value
    } = jsonObject // destructuring
  
    const sensor = new Sensor(description, id, lat, lng, place, readonly, state_code, value)
  
    return sensor
  }
  
  
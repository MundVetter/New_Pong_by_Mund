export default class Physics {
    constructor (options = {}) {
      this.energy = (typeof options.energy !== 'undefined') ? options.energy : 0
      this.mass = (typeof options.mass !== 'undefined') ? options.mass : 10
      this.airDensity = (typeof options.airDensity !== 'undefined') ? options.airDensity : 1.293
      this.area = options.area || 5
      this.dragCo = options.dragCo || 1
      this.t = 0.005
      this.friction = (typeof options.friction !== 'undefined') ? options.friction : false
      this.frictionCo = options.frictionCo || 0.0001
      this.power = 0
  
      this.powerDirection = ''
      this.objectDirection = ''
    }
  
    calcEnergy () {
      if (this.power > 0) {
        if (this.objectDirection === '') this.objectDirection === this.powerDirection 
   
        if (this.powerDirection === this.objectDirection) {
          this.energy += this.power * this.t
        } else if(this.powerDirection !== '') {
          this.energy -= this.power * this.t
        }
      }
   
      if (this.energy < 0) {
        this.energy = Math.abs(this.energy)
        this.objectDirection = (this.objectDirection === 'up' ? 'down' : 'up')
      }
  
      this.power = 0
      let resistance = 0.5 * this.airDensity * this.energyToVelocity(this.energy, this.mass) * this.dragCo
      if (this.friction) resistance += this.mass * 9.81 * this.frictionCo
    //   this.energy -= resistance
      this.energy = ~~(this.energy * 1000) / 1000
      console.log(this.energy)
    }
  
    energyToVelocity (energy, mass) {
      return energy * this.t
    }
  }
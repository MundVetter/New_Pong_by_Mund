/* globals window */
import * as PIXI from 'pixi.js'
import Game from 'gp_engine'
import bot from './bot.js'
import screenfull from 'screenfull'
import Controller from './controller.js'
import gameLoop from './gameLoop.js'

export default class Render {
  constructor (options = {}, stop = () => {}, pause = () => {}) {
    this.game = new Game(options)
    this.stop = stop
    this.pauseAction = pause
    this.reRender = false

    this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, window.innerWidth, window.innerHeight)
    this.renderer = new PIXI.autoDetectRenderer({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x333333
    })

    this.keys = []
    this.actions = ['up', 'down']
    const sharedState = new SharedArrayBuffer(Uint8Array.BYTES_PER_ELEMENT * this.game.paddles.length * this.actions.length)
    this.controller = new Controller(options, this.actions, options.paddles, sharedState)
    this.gameLoop = new gameLoop(options, sharedState)

    this.touchAreas = new PIXI.Container()
    this.touchAreas.interactive = true
    this.addTouchAreas()

    this.target = document.getElementById('canvas')
    while (this.target.firstChild) {
      this.target.removeChild(this.target.firstChild)
    }

    this.resize = this.resize.bind(this)
    this.activateKey = this.activateKey.bind(this)
    this.deactivateKey = this.deactivateKey.bind(this)
    this.addEventListeners()
  }
  addEventListeners () {
    window.addEventListener('resize', this.resize)
    window.addEventListener('keyup', this.deactivateKey, {passive: true})
    window.addEventListener('keydown', this.activateKey, {passive: true})
    window.addEventListener('contextmenu', this.blockContext)
  }
  removeEventListeners () {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('keyup', this.deactivateKey, {passive: true})
    window.removeEventListener('keydown', this.activateKey, {passive: true})
    window.removeEventListener('contextmenu', this.blockContext)
    screenfull.off('change', this.pause.bind(this))
  }
  resize () {
    this.multiplier = this.findSaveMultiplier(...this.game.fieldSize, window.innerWidth, window.innerHeight)
    this.addTouchAreas()
    this.firstRender()
    this.renderer.resize(window.innerWidth, window.innerHeight)
  }
  activateKey (e) {
    this.controller.activateKey(e.keyCode)
  }
  deactivateKey (e) {
    this.controller.deactivateKey(e.keyCode)
  }
  blockContext (e) {
    e.preventDefault()
  }
  addTouchAreas () {
    this.touchAreas.removeChildren()
    for (let i = 0; i < this.game.paddles.length; i++) {
      for (let j = 0; j < this.actions.length; j++) {
        const area = new PIXI.Graphics()
        const standard = this.mp(this.game.fieldSize[0] / 2, this.game.fieldSize[1] / 2)
        area.hitArea = new PIXI.Rectangle(
          i * standard[0],
          j * standard[1],
          i * standard[0] + standard[0],
          j * standard[1] + standard[1])
        area.interactive = true
        this.touchAreas.addChild(area)
        
        const [paddleId, actionId] = (window.innerWidth > window.innerHeight) ? [i, j] : [j, i]
        area.on('touchstart', () => {
          this.controller.addControl(paddleId, actionId)
        })
        area.on('touchend', () => {
          this.controller.removeControl(paddleId, actionId)
        })
        area.on('touchendoutside', () => {
          this.controller.removeControl(paddleId, actionId)
        })
      }
    }
  }
  findSaveMultiplier (xS, yS, xT, yT) {
    if (window.innerWidth > window.innerHeight) {
      return {
        x: xT / xS,
        y: yT / yS
      }
    } else {
      return {
        x: yT / xS,
        y: xT / yS
      }
    }
  }
  mp (x, y = 0, mp = this.multiplier) {
    if (window.innerWidth > window.innerHeight) {
      return [x * mp.x, y * mp.y]
    } else {
      return [y * mp.y, x * mp.x]
    }
  }
  firstRender () {
    if (this.reRender) {
      this.paddles.destroy()
      this.ball.destroy()
      this.textContainer.destroy()
      this.stage.destroy()
    }
    this.reRender = true

    this.paddles = new PIXI.Container()
    this.ball = new PIXI.Graphics()
    this.textContainer = new PIXI.Container()
    this.stage = new PIXI.Container()
    this.renderer.render(this.stage)

    for (let i = 0; i < this.game.paddles.length; i++) {
      const paddle = this.game.paddles[i]
      const paddlePos = this.gameLoop.getPaddlePos(i)
      // draw the text
      const scoreText = new PIXI.Text('', {
        fontFamily: 'sarpanch',
        fontSize: this.multiplier.x * 10,
        fill: 0xffffff,
        stroke: 0xff0000
      })
      const textPos = this.mp(paddlePos[0], paddlePos[1] + 100)
      scoreText.x = textPos[0]
      scoreText.y = textPos[1]
      this.textContainer.addChild(scoreText)

      // draw the paddles
      const paddleRender = new PIXI.Graphics()
      paddleRender.lineStyle(this.multiplier.x, 0xff0000)
      paddleRender.beginFill(0xffffff)
      paddleRender.drawRect(0, 0, ...this.mp(...paddle.size))
      const correctedPaddlePos = this.mp(...paddlePos)
      paddleRender.x = correctedPaddlePos[0]
      paddleRender.y = correctedPaddlePos[1]
      paddleRender.endFill()
      this.paddles.addChild(paddleRender)
    }

    // draw the ball
    const correctedBallPos = this.mp(...this.gameLoop.getBallPos())
    this.ball.lineStyle(this.multiplier.x, 0xff0000)
    this.ball.beginFill(0xffffff)
    this.ball.drawCircle(0, 0, (this.game.ball.size / 2) * this.multiplier.x)
    this.ball.x = correctedBallPos[0]
    this.ball.y = correctedBallPos[1]
    this.ball.endFill()

    this.stage.addChild(this.ball)
    this.stage.addChild(this.paddles)
    this.stage.addChild(this.textContainer)
    this.stage.addChild(this.touchAreas)
  }
  start () {
    screenfull.on('change', this.pause.bind(this))

    this.target.appendChild(this.renderer.view)
    this.firstRender()

    const gameLoop = () => {
      // if (!this.game.ended) {
      if (true) {

        for (let i = 0; i < this.game.paddles.length; i++) {
          const paddle = this.game.paddles[i]
          const scoreText = this.textContainer.getChildAt(i)
          const paddlePos = this.gameLoop.getPaddlePos(i)

          // console.log(paddlePos)
          // console.log('' + i + ' ' + paddlePos)
          const textPos = this.mp(paddlePos[0], paddlePos[1] + 100)
          scoreText.text = paddle.points || ''
          scoreText.x = textPos[0]
          scoreText.y = textPos[1]

          const paddleRender = this.paddles.getChildAt(i)
          const correctedPaddlePos = this.mp(...paddlePos)
          paddleRender.x = correctedPaddlePos[0]
          paddleRender.y = correctedPaddlePos[1]
        }
        const correctedBallPos = this.mp(...this.gameLoop.getBallPos())
        this.ball.x = correctedBallPos[0]
        this.ball.y = correctedBallPos[1]

        // Loop this function at 60 frames per second
        window.requestAnimationFrame(gameLoop)

        // Render the stage to see the animation
        this.renderer.render(this.stage)
      } else {
        this.removeEventListeners()
        screenfull.exit();
        this.stage.destroy()
        this.stop()
      }
    }
    gameLoop()
  }
  unpause () {
    this.gameLoop.unpause()
  }
  pause () {
    if(!screenfull.isFullscreen && !this.game.ended) {
      this.gameLoop.pause()
      this.pauseAction()
    }
  }
}
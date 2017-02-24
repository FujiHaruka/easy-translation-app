#!/usr/bin/env node

require('shelljs/global')
const { port } = require('../../env')
const pkg = require('../../package.json')

let name = `${pkg.name}_redis`
let command = `
  docker run -d --name ${name} -p ${port.REDIS} redis:3.0
`.trim()

exec(command)

/* global exec */

'use strict';

var express = require('express');
var mongoose = require('mongoose');
import {config} from 'config/index';

export function run (dir) {
  console.log(config);
}

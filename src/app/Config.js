// src/app/Config.js

export const MAX_PATH_LENGTH = 400;
export const CIRCLE_SEGS = 64;
export const PATH_Z_SCALE = 55;
export const GIZMO_MARGIN = 70;
export const DEFAULT_FRICTION = 0.94;
export const DEFAULT_SLERP_FACTOR = 0.15;

export const DEFAULT_CIRCLES = [
  { id: 0, radius: 127.3, freq: 1, phase: 0 },
  { id: 1, radius: 42.4, freq: 3, phase: 0 },
  { id: 2, radius: 25.4, freq: 5, phase: 0 },
];

export const COLORS = {
  ink: '#e8e6df',
  inkDim: '#7a7870',
  inkMute: '#3d3c3a',
  surface: '#0d0d0c',
  panel: 'rgba(14,14,13,0.88)',
  panelSolid: '#0e0e0d',
  rule: '#222220',
  blue: '#4d9fff',
  green: '#3ecf8e',
  red: '#f47c5a',
  purple: '#a78bfa',
  amber: '#f5a623',
  cyan: '#22d3ee',
};

export const AXES = [
  { name: 'X',  label: '+X', color: '#ff3b4d', dir: [ 1, 0, 0], positive: true },
  { name: 'Y',  label: '+Y', color: '#5ec940', dir: [ 0, 1, 0], positive: true },
  { name: 'Z',  label: '+Z', color: '#3d8eff', dir: [ 0, 0, 1], positive: true },
  { name: '-X', label: '−X', color: '#ff8899', dir: [-1, 0, 0], positive: false },
  { name: '-Y', label: '−Y', color: '#a3e07a', dir: [ 0,-1, 0], positive: false },
  { name: '-Z', label: '−Z', color: '#8dbeff', dir: [ 0, 0,-1], positive: false },
];

export const AXIS_VECTORS = {
  'X':  [ 1, 0, 0],
  '-X': [-1, 0, 0],
  'Y':  [ 0, 1, 0],
  '-Y': [ 0,-1, 0],
  'Z':  [ 0, 0, 1],
  '-Z': [ 0, 0,-1],
};